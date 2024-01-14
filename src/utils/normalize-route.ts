/** @format */

import { Params } from '../types';
import { Path } from '../types/path';

export const øNormalizeRoute = (segments: Path, query: Params = {}): [string, string, URL] => {
    // Determine if the path is a absolute or relative path to set the base string of the url
    const absolute = segments[0].startsWith('.');
    const resource = new URL(segments.join('/'), absolute ? '' : window.location.href);

    // Append additional query Params
    Object.entries(query).forEach(([key, value]) => resource.searchParams.append(key, value));

    return [resource.pathname, resource.search, resource];
};
