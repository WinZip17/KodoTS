export const GET_BANNERS_LIST = '[BANNERS] GET_BANNERS_LIST';

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
