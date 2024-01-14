/** @format */

import { Grain, createDirective } from '@grainular/nord';
import { Route } from '../../types';
import { getNodes } from '../../utils/get-nodes';

export const createOutletForRouter = (matched: Grain<[string, null | Route]>) =>
    createDirective<Text>(
        (node: Text) => {
            // Create the comment denoting the outlet.
            const outlet = document.createComment(`[Nørd:Router-Outlet]`);
            node.replaceWith(outlet);

            // keep track of the existing nodes
            let current: Node[] = [];

            // Subscribe to track changes in the activated route of the
            // Router, and change the component attached to outlet dynamically
            matched.subscribe(async (route) => {
                const [path, _route] = route;
                if (!_route || (path === 'init' && _route === null)) {
                    return;
                }

                const nodes = await getNodes(_route);
                current.forEach((node) => node.parentElement?.removeChild(node));
                current = [...nodes];
                outlet.after(...nodes);
            });
        },
        {
            nodeType: 'Text',
        }
    );
