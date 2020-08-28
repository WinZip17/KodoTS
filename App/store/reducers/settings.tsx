import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../axiosSettinsg';
import {settingsState, settingsTypes} from '../../types/settingsTypes';

// Actions
export const GET_SETTINGS = 'KodoTS/reducer/GET_SETTINGS';

// Reducer
const initialState: settingsState = {
  loading: false,
  settings: {
    courier_phone_clean: '',
    courier_phone_fmt: '',
    delivery_zones: [],
    first_order_discount_percent: 0,
    highload: false,
    max_delivery_time_without_prepayment: 0,
    max_price_without_prepayment: 0,
    min_order: 0,
    pickup_address: '',
    pickup_discount_percent: 0,
    restaurant_phone_clean: '',
    restaurant_phone_fmt: '',
    whatsapp_restaurant_phone_clean: '',
    whatsapp_restaurant_phone_fmt: '',
  },
};
export default function settingsReducer(state = initialState, action: settingsTypes) {
  switch (action.type) {
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const getSettings = (): ThunkAction<
  void,
  RootState,
  unknown,
  settingsTypes
  > => async (dispatch) => {
  try {
    const settings = await client.get('/settings');
    return dispatch({
      type: GET_SETTINGS,
      payload: settings.data,
    });
  } catch (err) {
    console.log(err);
  }
};
