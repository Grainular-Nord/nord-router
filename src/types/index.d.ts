/** @format */

import { ReadonlyGrain } from '@grainular/nord';
import { Params } from './params';

export type { Router } from './router';
export type { Route } from './route';
export type { Tree } from './tree';
export type { TreeNode } from './tree-node';
export type { RouteGuard } from './route-guard';
export type { Params } from './params';
export type { ActivatedRoute } from './activated-route';

// The global interfaces that are amended

declare global {
    interface HTMLAnchorElement {
        params: ReadonlyGrain<Params> | undefined;
    }
}
