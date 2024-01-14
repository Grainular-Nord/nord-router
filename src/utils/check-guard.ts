/** @format */

import { RouteGuard } from '../types';
import { Navigator } from '../types/navigator';

export const checkGuard = (path: string, redirect: Navigator) => {
    return (guard: RouteGuard) => {
        const result = guard(path, redirect);
        return !(result instanceof Promise) ? result : false;
    };
};
