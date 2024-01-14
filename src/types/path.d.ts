/** @format */

/**
 * Represents a route path as a tuple. The first element of the tuple is always a string,
 * representing the base path. The subsequent elements can be strings, booleans, or numbers.
 * These elements typically represent dynamic segments or flags in the route path.
 *
 * Example usage:
 * - As a simple string path: `['/home']`
 * - With dynamic segments: `['/user', userId]` where `userId` is a variable of type string or number
 * - With flags or additional parameters: `['/settings', true, 'advanced']`
 *
 * @type {[string, ...(string | boolean | number)[]]} Path
 */
export type Path = [string, ...(string | boolean | number)[]];
