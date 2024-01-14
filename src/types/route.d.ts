/** @format */

import { Component } from '@grainular/nord';
import { RouteGuard } from './route-guard';

/**
 * Represents a route configuration object in the Nørd-Router library.
 * Each route is defined with a specific path and can have associated route guards for activation and deactivation.
 * A route can define a component, child routes, or a redirect path, but only one of these options can be used per route.
 *
 * @type {Object} Route
 *
 * @property {`/${string}`} path - The path for the route. It should start with a forward slash and follow with a string.
 *
 * @property {RouteGuard[]} [onActivate] - Optional. An array of route guards that are called before the route is activated.
 *                                        These guards can determine if the route should be activated or not.
 *
 * @property {RouteGuard[]} [onDeactivate] - Optional. An array of route guards that are called before the route is deactivated.
 *                                           These guards can determine if the route should be deactivated or not.
 *
 * @property {Component<{}> | (() => Promise<Component<{}>>)} [component] - Optional. The component to render when the route is matched.
 *                                                                         Can be either a component or a function that returns a component asynchronously.
 *                                                                         This property is mutually exclusive with `children` and `redirect`.
 *
 * @property {Route[]} [children] - Optional. An array of child routes. This is used for nested routing.
 *                                  This property is mutually exclusive with `component` and `redirect`.
 *
 * @property {string} [redirect] - Optional. A path to redirect to when this route is matched.
 *                                 This property is mutually exclusive with `component` and `children`.
 */

export type Route = {
    /**
     * The path for the route.
     * It should start with a forward slash ('/') followed by the specific path as a string.
     * This string defines the URL path that the route will match.
     *
     * Example: '/home', '/users/:userId'
     *
     * @type {`/${string}`}
     */
    path: `/${string}`;
    /**
     * Optional. An array of route guards that are called before the route is activated.
     * These guards can determine if the route should be activated based on custom logic or conditions.
     * Returning `true` from a guard allows the route to activate, while `false` prevents it.
     *
     * Example usage:
     * onActivate: [guardFunction1, guardFunction2]
     *
     * @type {RouteGuard[]}
     */
    onActivate?: RouteGuard[];
    /**
     * Optional. An array of route guards that are called before the route is deactivated.
     * Similar to `onActivate`, these guards determine if the route should be deactivated.
     * Returning `true` from a guard allows the route to deactivate, while `false` prevents it.
     *
     * Example usage:
     * onDeactivate: [guardFunction1, guardFunction2]
     *
     * @type {RouteGuard[]}
     */
    onDeactivate?: RouteGuard[];
} & (
    | {
          /**
           * Optional. The component to render when the route is matched.
           * Can be either a direct component instance or a function that returns a component asynchronously.
           * This property is used for rendering specific views/components when a route is matched.
           * It is mutually exclusive with `children` and `redirect`.
           *
           * Example usage:
           * component: MyComponent
           * component: () => import('./MyComponent').then(mod => mod.default)
           *
           * @type {Component<{}> | (() => Promise<Component<{}>>)}
           */
          component: Component<{}> | (() => Promise<Component<{}>>);
          /**
           * This property is not available when 'component' is set in the route configuration.
           * TypeScript's 'never' type is used here to enforce this rule at compile time.
           * If 'component' is specified, setting this property will result in a type error.
           * This restriction ensures that a route configuration does not simultaneously define
           * a component to render and child routes or a redirect path, which would lead to
           * ambiguous routing behavior.
           *
           * @type {never}
           */
          children?: never;
          /**
           * This property is not available when 'children' or 'component' is set in the route configuration.
           * TypeScript's 'never' type is used here to enforce this rule at compile time.
           * If either 'children' or 'component' is specified, setting this property will result in a type error.
           * This restriction ensures that a route configuration does not simultaneously define
           * a redirect path along with child routes or a specific component, avoiding routing conflicts.
           *
           * @type {never}
           */
          redirect?: never;
      }
    | {
          /**
           * Optional. An array of child routes for nested routing scenarios.
           * Each child route is a `Route` object, allowing for complex route structures with nested paths.
           * This property is mutually exclusive with `component` and `redirect`.
           *
           * Example usage:
           * children: [{ path: '/child', component: ChildComponent }]
           *
           * @type {Route[]}
           */
          children: Route[];

          /**
           * This property is not available when 'children' is set in the route configuration.
           * TypeScript's 'never' type is used here to enforce this rule at compile time.
           * If 'children' is specified, setting this property will result in a type error.
           * This restriction ensures that a route configuration does not simultaneously define
           * child routes and a specific component or redirect path, maintaining clear routing logic.
           *
           * @type {never}
           */
          component?: never;
          /**
           * This property is not available when 'children' or 'component' is set in the route configuration.
           * TypeScript's 'never' type is used here to enforce this rule at compile time.
           * If either 'children' or 'component' is specified, setting this property will result in a type error.
           * This restriction ensures that a route configuration does not simultaneously define
           * a redirect path along with child routes or a specific component, avoiding routing conflicts.
           *
           * @type {never}
           */
          redirect?: never;
      }
    | {
          /**
           * Optional. A path to redirect to when this route is matched.
           * Instead of rendering a component or handling child routes, this route will redirect to another path.
           * This property is mutually exclusive with `component` and `children`.
           *
           * Example usage:
           * redirect: '/other-route'
           *
           * @type {string}
           */
          redirect: string;
          /**
           * This property is not available when 'redirect' is set in the route configuration.
           * TypeScript's 'never' type is used here to enforce this rule at compile time.
           * If 'redirect' is specified, setting this property will result in a type error.
           *
           * @type {never}
           */
          component?: never;
          /**
           * This property is not available when 'redirect' is set in the route configuration.
           * TypeScript's 'never' type is used here to enforce this rule at compile time.
           * If 'redirect' is specified, setting this property will result in a type error.
           *
           * @type {never}
           */
          children?: never;
      }
);
