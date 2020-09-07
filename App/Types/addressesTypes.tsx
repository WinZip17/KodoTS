import { GET_ADDRESS_LIST, SAVE_ADDRESS } from "../Stores/reducers/address";

export interface addressType {
  street_name: string;
  building: string;
  house: string;
  flat: string;
  id: number;
  full: string;
}

export interface addressesState {
  list: addressType[];
}

export interface getAddressesList {
  type: typeof GET_ADDRESS_LIST;
  payload: addressType[];
}

export interface saveAddresses {
  type: typeof SAVE_ADDRESS;
  payload: addressType;
}

export type AddressActionTypes = getAddressesList | saveAddresses;
