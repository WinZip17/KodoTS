import { GET_LAST_ORDER } from '../store/reducers/orders';
import {itemMenuInfo} from './menuListTypes';

export interface ordersState {
  order: {
    data: order | null;
    loading: boolean;
  };
  history: {
    loading: boolean;
    data: order[] | null;
  };
  duration: {
    loading: boolean;
    data: number | null;
  };
  lastOrder: order | null;
  address: {
    street_name: string;
    building: string;
    house: string;
    flat: string;
  };
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

interface order {
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
  payload: order | null;
}

export type ordersTypes = getLastOrder;
