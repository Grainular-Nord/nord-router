/** @format */

import { ReadonlyGrain, createDirective } from '@grainular/nord';
import { RouterLink } from '../../types/router-link';
import { Route } from '../../types';
import { Navigator } from '../../types/navigator';

export const createLinkForRouter = (navigate: Navigator, matched: ReadonlyGrain<[string, Route | null]>): RouterLink =>
    createDirective<Element>((node) => {
        if (!(node instanceof HTMLAnchorElement)) {
            return;
        }

        // Set a router-link attribute to mark the element as router link
        node.setAttribute(`router-link`, '');

        // Attach the event listener to dispatch the routing click
        node.addEventListener('click', (ev) => {
            // Prevent the default click execution
            ev.preventDefault();
            const target = node.getAttribute('href');
            if (!target) return;
            navigate([target], {
                ...(node.params ? { search: node.params() } : {}),
            });
        });

        // Attach the event listener to check if the active class should
        // should be set, if their is one
        if (node.hasAttribute('link-active')) {
            // Helper function to set the active class
            const matchActiveClass = (target: string) => {
                const href = node.getAttribute('href');
                const clsName = node.getAttribute('link-active')!;
                if (target.startsWith(href!)) {
                    node.classList.add(clsName);
                } else {
                    node.classList.remove(clsName);
                }
            };

            // Subscribe to the matched
            matched.subscribe(([path]) => {
                matchActiveClass(path);
            });
        }
    });
