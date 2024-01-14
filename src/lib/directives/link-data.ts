/** @format */

import { Directive, Grain, createDirective, grain, readonly } from '@grainular/nord';
import { Params } from '../../types';

/**
 * Creates a Grain instance for managing link parameters, along with an attached directive for updating these parameters on an anchor tag.
 * This function is particularly useful for dynamically setting search parameters on hyperlinks in your application.
 *
 * @template T extends Params
 * @param {T} initial - The initial value for the parameters. It should be an object conforming to the Params type.
 *
 * @returns {Grain<T> & { data: Directive<Element> }} - Returns a Grain object containing the link parameters,
 *          along with an attached directive ('data') for updating these parameters on an anchor tag.
 *          The directive adds a 'params' property to the anchor element, which is a readonly version of the Grain data.
 */

export const linkData = <T extends Params>(initial: T) => {
    const data = grain(initial);
    const paramDirective = createDirective<Element>(
        (node) => {
            // add a property to the element that can be read synchronously by the routerLink
            if (!(node instanceof HTMLAnchorElement)) {
                return;
            }

            node.params = readonly(data);
        },
        { nodeType: 'Element' }
    );

    Object.defineProperty(data, 'data', {
        value: paramDirective,
        writable: false,
    });

    return data as Grain<T> & { data: Directive<Element> };
};
