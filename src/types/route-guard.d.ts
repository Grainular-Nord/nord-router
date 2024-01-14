/** @format */

import { Navigator } from './navigator';

/**
 * Represents a route guard function in the Nørd-Router library.
 * Route guards are used to control navigation by allowing or preventing
 * the routing to a particular path based on custom logic.
 *
 * @type {Function} RouteGuard
 *
 * @param {string} route - The route that is being navigated to. This is a string representing
 *                         the path to which the navigation is intended.
 *
 * @param {Navigator} redirect - A Navigator function that can be used within the guard
 *                               to redirect to a different route if necessary. This allows
 *                               the route guard to not only block navigation but also to
 *                               redirect to an alternative path.
 *
 * @returns {ReturnType<Navigator> | boolean} - The return type of this function can be either the same as the
 *                                              return type of a Navigator (i.e., `Promise<void>`) or a boolean.
 *                                              A return value of `true` allows the navigation, while `false`
 *                                              prevents it. If a redirect is performed inside the guard,
 *                                              the return should be the result of the Navigator function.
 */
export type RouteGuard = (route: string, redirect: Navigator) => ReturnType<Navigator> | boolean;
