import { GET_STREET_LIST } from "../Stores/reducers/streets";

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
