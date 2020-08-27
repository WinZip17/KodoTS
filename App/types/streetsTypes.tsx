export const GET_STREET_LIST = '[STREET] GET_STREET_LIST';

export interface streetsState {
  streets: street[];
}

interface street {
  name: string;
  id: number;
}

export interface getStreetsList {
  type: typeof GET_STREET_LIST;
  payload: street[];
}

export type streetsTypes = getStreetsList;
