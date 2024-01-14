/** @format */

/**
 * Represents the initialization configuration for the Nørd-Router.
 * This type defines settings used when initializing the router, particularly for handling special routing cases.
 *
 * @type {Object} RouterInit
 *
 * @property {`/${string}` | null} notFound - The path to redirect to when a requested route is not found.
 *           This should be a string representing a valid route path, starting with a forward slash ('/').
 *           If set to `null`, it indicates that no redirection should occur for not found routes.
 *           Example: '/404' for redirecting to a custom '404 Not Found' page.
 */
export type RouterInit = {
    /**
     * The path to redirect to when a requested route is not found.
     * This property should be set to a string representing a valid route path, starting with a forward slash ('/').
     * If a route is requested that does not exist in the router's configuration, the router will redirect to this path.
     * Setting this property to `null` indicates that no redirection should occur for routes that are not found,
     * allowing the application to handle these cases in a custom manner.
     *
     * Example:
     * - Redirecting to a 'Not Found' page: '/404'
     * - Handling not found routes without redirection: `null`
     *
     * @type {`/${string}` | null}
     */
    notFound: `/${string}` | null;
};
