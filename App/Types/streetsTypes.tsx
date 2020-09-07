import { GET_STREET_LIST } from "../Stores/reducers/streets";

export interface streetsState {
  streets: streetTypes[];
}

export interface streetTypes {
  name: string;
  id: number;
}

export interface getStreetsList {
  type: typeof GET_STREET_LIST;
  payload: streetTypes[];
}

export type streetsTypes = getStreetsList;
