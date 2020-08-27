export const GET_ITEMS = '[ITEMS] GET_ITEMS';
export const GET_CATEGORIES = '[ITEMS] GET_CATEGORIES';
export const CHANGE_ACTIVE_CATEGORY = '[ITEMS] CHANGE_ACTIVE_CATEGORY';

interface valueOptionsItem {
  name: string;
  id: number;
}

export interface optionsItem {
  values: valueOptionsItem[];
  id: number;
  name: string;
}

export interface itemMenuInfo {
  category_id: number | null;
  cook_time: number | null;
  id: number;
  price_cents: number | null;
  price_int: number | null;
  desc: string | null;
  image: string | null;
  name: string | null;
  old_price: string | null;
  old_price_int: string | null;
  price: string | null;
  label_ids: number[];
  options: optionsItem[];
}

export interface categoriesInfo {
  id: number;
  name: string;
  data: itemMenuInfo[];
}

export interface MenuListState {
  loading: boolean;
  items: itemMenuInfo[];
  activeCategory: number;
  categories: categoriesInfo[];
}

export interface getItems {
  type: typeof GET_ITEMS;
  payload: itemMenuInfo[];
}

export interface getCategories {
  type: typeof GET_CATEGORIES;
  payload: categoriesInfo[];
}

export interface selectActiveCategory {
  type: typeof CHANGE_ACTIVE_CATEGORY;
  payload: number;
}

export type MenuListActionTypes = getItems | getCategories | selectActiveCategory;
