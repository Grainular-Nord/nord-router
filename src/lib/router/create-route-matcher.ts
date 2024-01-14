/** @format */

import { Route, Tree, TreeNode } from '../../types';
import { øNormalizeRoute } from '../../utils/normalize-route';

export const øCreateRouteMatcher = (routes: Route[]) => {
    // Routes are normalized into a tree that can be easily matched
    const øTree: Tree = {};

    const addRoute = (route: Route, parentNode = øTree) => {
        // Normalize the path and get segments
        const [normalized] = øNormalizeRoute([route.path]);
        const segments = normalized.split('/').filter((v) => v !== '');
        // Reduce the segments to find the position in the tree for this route

        const currentNode: TreeNode = segments.reduce((acc, cur) => {
            // If the current segment is not yet a key in the accumulator, add it
            if (!acc[cur]) {
                acc[cur] = {};
            }
            // Return the nested object for the next iteration
            return acc[cur];
        }, parentNode);

        // If the route has a component, assign it to the current node
        if (route) {
            currentNode.route = route;
        }

        // If the route has children, recursively add each child route
        if (route.children) {
            for (const childRoute of route.children) {
                addRoute(childRoute, currentNode);
            }
        }
    };
    for (const route of routes) {
        addRoute(route);
    }

    const øMatch = (route: string) => {
        const segments = route.split('/').filter((v) => v !== '');
        let currentNode: TreeNode | undefined = øTree;
        const params: Record<string, string> = {};
        for (const segment of segments) {
            if (!currentNode) {
                throw new Error('MISMATCH');
            }

            // Check if the segment is a parameter
            const paramMatch: string | undefined = Object.keys(currentNode).find((key) => key.startsWith(':'));
            switch (true) {
                case !!paramMatch:
                    const paramName = paramMatch.slice(1); // Remove the ':' prefix
                    params[paramName] = segment;
                    currentNode = currentNode[paramMatch];
                    break;
                case segment in currentNode:
                    // Regular segment matching
                    currentNode = currentNode[segment] as TreeNode;
                    break;
                default:
                    throw new Error(`MISMATCH`);
            }
        }

        // If the final segment has a component, return it along with any parameters
        if (currentNode && currentNode.route) {
            return { route: currentNode.route, params };
        } else {
            throw new Error('MISMATCH');
        }
    };

    return {
        match: øMatch,
    };
};
