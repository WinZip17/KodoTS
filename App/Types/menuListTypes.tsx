import {
  CHANGE_ACTIVE_CATEGORY,
  GET_CATEGORIES,
  GET_ITEMS,
  SET_CAT_OFFSET,
  SET_SORTED,
} from '../Stores/reducers/menuList';

interface valueOptionsItem {
  name: string;
  id: number;
}

export interface optionsItem {
  values: valueOptionsItem[];
  id: number;
  name: string;
  selectedValues: valueOptionsItem[];
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
  is_aquarium: boolean;
  options: optionsItem[];
}

export interface categoriesInfo {
  id: number;
  name: string;
  data: itemMenuInfo[];
}

export interface catOffsetsTypes {
  [key: number]: number;
};

export interface MenuListState {
  loading: boolean;
  items: itemMenuInfo[];
  activeCategory: number;
  categories: categoriesInfo[];
  sorted: number[][];
  catOffsets: catOffsetsTypes;
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

export interface setSorted {
  type: typeof SET_SORTED;
  payload: number[][];
}

export interface setCatOffsets {
  type: typeof SET_CAT_OFFSET;
  payload: catOffsetsTypes;
}

export type MenuListActionTypes =
  | getItems
  | getCategories
  | setCatOffsets
  | setSorted
  | selectActiveCategory;
