import {stringify} from 'qs';

export const constructUrl = (
  address,
  query,
) => `${address}${query ? `?${stringify(query)}` : ''}`;