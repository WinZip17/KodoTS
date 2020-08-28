import { GET_SETTINGS } from "../store/reducers/settings";

export interface settingsState {
  loading: boolean;
  settings: settings;
}

interface settings {
  courier_phone_clean: string;
  courier_phone_fmt: string;
  delivery_zones: number[][][];
  first_order_discount_percent: number;
  highload: boolean;
  max_delivery_time_without_prepayment: number;
  max_price_without_prepayment: number;
  min_order: number;
  pickup_address: string;
  pickup_discount_percent: number;
  restaurant_phone_clean: string;
  restaurant_phone_fmt: string;
  whatsapp_restaurant_phone_clean: string;
  whatsapp_restaurant_phone_fmt: string;
}

export interface getSettings {
  type: typeof GET_SETTINGS;
  payload: settings;
}

export type settingsTypes = getSettings;
