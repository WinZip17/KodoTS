import { GET_LAST_ORDER, SET_ADDRESS } from '../Stores/reducers/orders';
import {itemMenuInfo} from './menuListTypes';
import { addressType } from "./addressesTypes";

export interface ordersState {
  order: {
    data: orderType | null;
    loading: boolean;
  };
  history: {
    loading: boolean;
    data: orderType[] | null;
  };
  duration: {
    loading: boolean;
    data: number | null;
  };
  lastOrder: orderType | null;
  address: addressType;
}

export interface tempOrderTypes {
  people: number;
  payment: string;
  contactless?: boolean;
  delivery_option: string;
  address_id: string;
  address: addressType | null;
  ready_time: Date;
  change_from?: string;
  comment: string;
  delivery: string;
  line_items: itemsForOrderType[];
}

interface itemsForOrderType {
  count: number;
  id: number;
  item: itemMenuInfo;
  item_id: number;
  name: string;
  price_cents: number;
  sum_cents: number;
  sum_human: string;
  values: any[];
}

export interface orderType {
  address: string | null;
  address_lat: string | null;
  address_lng: string | null;
  change_from_cents: string | null;
  comment: string | null;
  courier_lat: string | null;
  courier_lng: string | null;
  courier_name: string | null;
  courier_phone: string | null;
  created_at: string | null;
  delivery: string;
  email: string | null;
  human_change_from: string | null;
  human_sum: string | null;
  human_total: string | null;
  id: number;
  line_items: itemsForOrderType[];
  name: null;
  payment: string | null;
  people: number;
  phone: string;
  rate: string | null;
  ready_time: string;
  state: string;
  sum_cents: number | null;
  total_cents: number | null;
}

export interface getLastOrder {
  type: typeof GET_LAST_ORDER;
  payload: orderType | null;
}

export interface setNewAddressSave {
  type: typeof SET_ADDRESS;
  payload: orderType | null;
}

export type ordersTypes = getLastOrder;
