/** @format */

import { Directive, ReadonlyGrain } from '@grainular/nord';
import { ActivatedRoute } from './activated-route';
import { RouterLink } from './router-link';
import { Navigator } from './navigator';

/**
 * The `Router` type represents the main routing interface in the Nørd-Router library.
 * It provides the core functionalities needed for navigating between routes,
 * rendering route components, and accessing route information.
 *
 * @type {Object} Router
 *
 * @property {Navigator} navigate - A function that initiates navigation to a specified route.
 *                                 The route is defined by an array of segments, which can be strings or any other types.
 *                                 This function returns a Promise that resolves when the navigation is complete.
 *                                 Example usage: `router.navigate(['/home'], { search: { ref: 'bookmark' } })`
 *
 * @property {Directive<Text>} outlet - A Directive that represents the location in the DOM where the routed component should be rendered.
 *                                      It's typically used in the application's template to define where the component for the current route will be displayed.
 *
 * @property {ActivatedRoute} activatedRoute - Provides information about the currently activated route.
 *                                             It includes details such as the current path, route parameters, and query parameters.
 *
 * @property {RouterLink} link - A utility for creating router links. It is used to generate URLs based on the route configuration.
 *                               This can be particularly useful for creating navigation links in the application's template.
 */
export type Router = {
    /**
     * A function that initiates navigation to a specified route.
     * The route is defined by an array of segments, which can include strings and other types.
     * This function returns a Promise that resolves when the navigation is complete.
     * It is used to programmatically navigate to different routes within the application.
     *
     * Example usage:
     * router.navigate(['/home'], { search: { ref: 'bookmark' } })
     *
     * @type {Navigator}
     */
    navigate: Navigator;
    /**
     * A Directive that represents the location in the DOM where the routed component should be rendered.
     * This is typically used in the application's main template or layout to define the placeholder
     * where the content of the current route will be displayed.
     *
     * @type {Directive<Text>}
     */
    outlet: Directive<Text>;
    /**
     * Provides information about the currently activated route.
     * This includes details such as the current path, route parameters, and query parameters.
     * It is useful for accessing and reacting to changes in the current route within components or services.
     *
     * @type {ActivatedRoute}
     */
    activatedRoute: ActivatedRoute;
    /**
     * A utility for creating router links.
     * This is used to generate URLs based on the route configuration, facilitating the creation of navigation links
     * in the application's templates or programmatically. It is essential for creating dynamic links
     * that adapt to the current routing state.
     *
     * @type {RouterLink}
     */
    link: RouterLink;
};
