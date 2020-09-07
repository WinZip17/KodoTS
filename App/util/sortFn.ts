import {streetTypes} from '../Types/streetsTypes';

export function sortFn(arr: streetTypes[], query: string) {
  return arr.filter(({name}) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );
}
