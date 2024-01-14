/** @format */
/**
 * Represents the state object used by the Navigator in the Nørd-Router library.
 * This type is used to pass additional state information during navigation.
 *
 * @type {Object} NavigatorState
 *
 * @property {Record<string, string>} [search] - Optional. An object representing the search
 *           parameters (query string) of the URL. Each key-value pair in this record
 *           corresponds to a query parameter name and its value as a string.
 *           Example: `{ q: 'search term', page: '1' }`.
 *
 * @property {Record<PropertyKey, unknown>} [state] - Optional. An object representing
 *           additional state to be associated with the route. This can be any arbitrary
 *           data that needs to be passed along with the navigation. The `PropertyKey` type
 *           allows the keys to be either strings, numbers, or symbols, and the values are of
 *           type `unknown`, meaning they can be of any type.
 */
export type NavigatorState = {
    search?: Record<string, string>;
    state?: Record<PropertyKey, unknown>;
};
