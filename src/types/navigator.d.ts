/** @format */

import { NavigatorState } from './navigator-state';
import { Path } from './path';

/**
 * Defines the Navigator function type used in the Nørd-Router library.
 * This function is responsible for navigating to a specified route with an optional initial state.
 *
 * @typedef {Function} Navigator
 *
 * @param {Path} route - The route to navigate to. The `Path` type is a tuple that defines
 *                       the structure of the route, including the base path and any dynamic
 *                       segments or flags. See the `Path` type for more details.
 *
 * @param {NavigatorState} [init] - Optional. The initial state to be passed to the navigator.
 *                                  This can be used to set up the route with a specific state
 *                                  before navigation. See the `NavigatorState` type for more details.
 *
 * @returns {Promise<void>} - A promise that resolves once the navigation process is complete.
 *                            This promise does not carry any value, as its resolution
 *                            signifies the completion of the navigation action.
 */
export type Navigator = (route: Path, init?: NavigatorState) => Promise<void>;
