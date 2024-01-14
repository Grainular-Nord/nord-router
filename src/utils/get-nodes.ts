/** @format */

import { Route } from '../types';

// Retrieve the nodes from the stored component
export const getNodes = async (route: Route): Promise<NodeList> => {
    return new Promise((res) => {
        if (route.component && 'isComponent' in route.component) {
            res(route.component({}));
        } else if (route.component) {
            route.component().then((component) => {
                res(component({}));
            });
        }
    });
};
