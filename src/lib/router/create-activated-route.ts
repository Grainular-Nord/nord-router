/** @format */

import { Grain, derived, grain, readonly } from '@grainular/nord';
import { Params } from '../../types/params';
import { ActivatedRoute } from '../../types/activated-route';

import { Route } from '../../types';

export const createActivatedRoute = (matched: Grain<[string, null | Route]>) => {
    const params = grain<Params>({});
    const searchParams = grain<Params>({});

    const activatedRoute: ActivatedRoute = {
        get path() {
            return matched()[0];
        },
        current: derived(matched, ([path]) => path),
        searchParams: readonly(searchParams),
        params: readonly(params),
    };

    return { activatedRoute, params, searchParams };
};
