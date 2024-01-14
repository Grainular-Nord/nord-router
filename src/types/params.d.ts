/** @format */

/**
 * Defines the structure for route parameters in the Nørd-Router library.
 * This type represents an object where keys are the names of the parameters,
 * and the values are their corresponding values, both as strings.
 *
 * This is commonly used to handle dynamic segments in the route path,
 * such as user IDs, product names, etc., where these values are represented
 * as strings.
 *
 * Example:
 * If the route is `/users/:userId` and the current path is `/users/123`,
 * then `Params` would be `{ userId: '123' }`.
 *
 * @type {Record<string, string>} Params
 */
export type Params = Record<string, string>;
