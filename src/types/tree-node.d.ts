/** @format */

import { Component } from '@grainular/nord';
import { Route } from './route';

export type TreeNode = {
    [key: string]: TreeNode;
} & {
    route?: Route;
};
