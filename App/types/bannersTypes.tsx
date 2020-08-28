import {GET_BANNERS_LIST} from "../store/reducers/banners";

export interface bannersState {
  banners: banner[];
  loading: boolean;
}

export interface banner {
  name: string;
  id: number;
  image: string;
}

export interface getBannersList {
  type: typeof GET_BANNERS_LIST;
  payload: banner[];
}

export type bannersTypes = getBannersList;
