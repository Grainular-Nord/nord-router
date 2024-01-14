/** @format */

import { Component, ReadonlyGrain } from '@grainular/nord';
import { Params } from './params';

/**
 * Represents the state of the currently activated route within the Nørd-Router.
 *
 * @property {string} path - The path of the current route. It's a string that represents the URL path
 *                           that the router is currently navigating. For example, '/home/about'.
 *
 * @property {ReadonlyGrain<string>} current - A readonly reactive data structure (ReadonlyGrain) that holds
 *                                             the current URL as a string. It's a reactive property,
 *                                             meaning it updates automatically as the route changes.
 *                                             This is useful for responding to route changes in a reactive manner.
 *
 * @property {ReadonlyGrain<Params>} params - A readonly reactive data structure (ReadonlyGrain) that contains
 *                                            the route parameters. 'Params' is an object where each key-value pair
 *                                            represents a dynamic segment of the URL (e.g., { userId: '123' } for
 *                                            a route like '/users/:userId'). This property is reactive and updates
 *                                            as the route parameters change.
 *
 * @property {ReadonlyGrain<Params>} searchParams - A readonly reactive data structure (ReadonlyGrain) that
 *                                                  contains the search parameters (query string) of the URL.
 *                                                  Similar to 'params', it's an object with key-value pairs
 *                                                  representing the query string parameters (e.g., { q: 'search' }
 *                                                  for a query string like '?q=search'). This property is also reactive,
 *                                                  updating with changes to the query string in the URL.
 */

export type ActivatedRoute = {
    /**
     * The path of the current route.
     * This is a string that represents the URL path that the router is currently navigating.
     * Example: '/home/about'.
     *
     * @type {string}
     */
    path: string;
    /**
     * A readonly reactive data structure (ReadonlyGrain) that holds the current URL as a string.
     * It's a reactive property, meaning it updates automatically as the route changes.
     * This property is useful for responding to route changes in a reactive manner.
     *
     * @type {ReadonlyGrain<string>}
     */
    current: ReadonlyGrain<string>;
    /**
     * A readonly reactive data structure (ReadonlyGrain) that contains the route parameters.
     * 'Params' is an object where each key-value pair represents a dynamic segment of the URL.
     * For example, { userId: '123' } for a route like '/users/:userId'.
     * This property is reactive and updates as the route parameters change.
     *
     * @type {ReadonlyGrain<Params>}
     */
    params: ReadonlyGrain<Params>;
    /**
     * A readonly reactive data structure (ReadonlyGrain) that contains the search parameters
     * (query string) of the URL. Similar to 'params', it's an object with key-value pairs
     * representing the query string parameters.
     * For example, { q: 'search' } for a query string like '?q=search'.
     * This property is also reactive, updating with changes to the query string in the URL.
     *
     * @type {ReadonlyGrain<Params>}
     */
    searchParams: ReadonlyGrain<Params>;
};
