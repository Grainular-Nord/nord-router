/** @format */

import { grain } from '@grainular/nord';
import { Route } from '../../types/route';
import { Router } from '../../types/router';
import { øCreateRouteMatcher } from './create-route-matcher';
import { createLinkForRouter } from './create-link-for-router.directive';
import { createActivatedRoute } from './create-activated-route';
import { øNormalizeRoute } from '../../utils/normalize-route';
import { createOutletForRouter } from './create-outlet-for-router';
import { checkGuard } from '../../utils/check-guard';
import { Navigator } from '../../types/navigator';
import { RouterInit } from '../../types/router-init';
import { NavigatorState } from '../../types/navigator-state';
import { Path } from '../../types/path';

/**
 * Creates and initializes a new router instance for the Nørd-Router library.
 * This function sets up the routing mechanism based on the provided routes and optional initialization configuration.
 *
 * @param {Route[]} routes - An array of `Route` objects that define the routing configuration for the application.
 *                           Each `Route` object specifies the path, associated component or redirect, and route guards.
 *
 * @param {RouterInit} [init] - Optional. An object of type `RouterInit` that provides initialization settings for the router.
 *                              Currently, it includes the 'notFound' property to handle routes that are not found.
 *                              If not provided, defaults to handling 'notFound' as `null` (no redirection).
 *
 * @returns {Router} - Returns a `Router` object with the core functionalities for navigation and route handling.
 *                     This includes the `navigate` method to change routes, `activatedRoute` for accessing
 *                     current route information, `link` for creating router links, and `outlet` for
 *                     rendering components based on the current route.
 *
 * Example usage:
 * ```ts
 *
 * // Define the routes for the application
 * export const routes: Route[] = [
 *      {
 *          path: '/404',
 *          component: NotFoundPage,
 *      },
 *      {
 *         path: '/',
 *         redirect: '/home',
 *     },
 *     {
 *         path: '/home',
 *         component: Home,
 *     },
 *     {
 *         path: '/overview',
 *         component: () => import('./pages/overview.page.ts').then((module) => module.Overview),
 *     },
 *     {
 *         path: '/overview',
 *         children: [
 *             {
 *                 path: '/nested/:id',
 *                 component: () => import('./pages/home.page.ts').then((module) => module.Home),
 *             },
 *         ],
 *     },
 * ];
 *
 * // Create the router instance with the defined routes and a 'notFound' redirection
 * export const router = createRouter(routes, { notFound: '/404' });
 * router.navigate('/home'); // Programmatic navigation to the 'home' route
 * ```
 */

export const createRouter = (routes: Route[], init?: RouterInit): Router => {
    const config = Object.fromEntries([['notFound', null], ...Object.entries(init ?? {})]) as RouterInit;
    const routerId = crypto.randomUUID();
    const { match } = øCreateRouteMatcher(routes);

    // Set up the states tracked inside the router instance
    const state = grain<Record<PropertyKey, unknown>>({});
    const matched = grain<[string, Route | null]>(['øInit', null]);
    const { params, searchParams, activatedRoute } = createActivatedRoute(matched);

    const handleRouteMismatch = (e: unknown, route: string) => {
        if (e instanceof Error && e.message === 'MISMATCH') {
            console.error(`[Nørd:Router]: Could not match route '${route}'`);
        }

        if (config.notFound !== null) {
            navigate([config.notFound]);
        }
    };

    // Main navigation function
    let redirecting = false;
    const navigate: Navigator = async (route: Path, _state: NavigatorState = {}) => {
        const { state: props = {}, search: query = {} } = _state;

        // redirect function that keeps track of the redirection process
        const redirect: Navigator = async (route: Path, state: NavigatorState = {}) => {
            redirecting = true;
            navigate([...route], state);
        };

        const [normalized, search, raw] = øNormalizeRoute(route, query);

        try {
            const { route: matchedRoute, params: matchedParams } = match(normalized);

            // Check if the route can be activated & if the old route can be deactivated;
            // If the route is already being redirected, the deactivation checks are skipped.
            if (!redirecting) {
                const canDeactivate = (matched()[1]?.onDeactivate ?? []).every(checkGuard(normalized, redirect));
                if (!canDeactivate) {
                    return;
                }
            }

            // Check if the current Route has a redirection handler attached
            if (matchedRoute.redirect) {
                redirect([matchedRoute.redirect]);
                return;
            }

            // Check if the route can activate
            const canActivate = (matchedRoute.onActivate ?? []).every(checkGuard(normalized, redirect));
            if (!canActivate) {
                return;
            }

            // It the current route can be activated, set the params and push the new state to the history.
            params.set(matchedParams);
            searchParams.set(Object.fromEntries([...raw.searchParams.entries()]));
            matched.set([normalized, matchedRoute]);
            state.set(props);
            window.history.pushState(
                { params: params(), search: searchParams(), serialized: normalized, route, ...props },
                normalized,
                raw
            );
            redirecting = false;
        } catch (e) {
            handleRouteMismatch(e, normalized);
        }
    };

    // Event handler system tracks the routing events that are dispatched
    // and depending on the type, dispatches different actions
    window.addEventListener('popstate', (ev) => {
        ev.preventDefault();
        navigate([ev.state.route]);
    });

    // Match a initial root route based on the current window.location.pathname
    navigate([window.location.pathname]);

    return {
        navigate,
        activatedRoute,
        link: createLinkForRouter(navigate, matched),
        outlet: createOutletForRouter(matched),
    };
};
