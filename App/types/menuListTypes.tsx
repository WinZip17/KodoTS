export const GET_ITEMS = '[ITEMS] GET_ITEMS';

interface itemInfo {
  category_id: number | null;
  cook_time: number | null;
  id: number | null;
  price_cents: number | null;
  price_int: number | null;
  desc: string | null;
  image: string | null;
  name: string | null;
  old_price: string | null;
  old_price_int: string | null;
  price: string | null;
  label_ids: any[];
  options: any[];
}

export interface MenuListState {
  loading: boolean;
  items: itemInfo[];
}

export interface getItems {
  type: typeof GET_ITEMS;
  payload: itemInfo[];
}

export type MenuListActionTypes = getItems;
