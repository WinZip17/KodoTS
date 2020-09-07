import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import { ordersState, ordersTypes, orderType, tempOrderTypes } from '../../Types/ordersTypes';
import client from '../../Services/axiosSettinsg';
import {SAVE_ADDRESS} from './address';
import { AddressActionTypes, addressType } from '../../Types/addressesTypes';

// Actions
export const GET_LAST_ORDER = 'KodoTS/reducer/GET_LAST_ORDER';
export const SET_ADDRESS = 'KodoTS/reducer/SET_ADDRESS';

// Reducer
const initialState: ordersState = {
  order: {
    data: null,
    loading: false,
  },
  history: {
    loading: false,
    data: null,
  },
  duration: {
    loading: false,
    data: null,
  },
  lastOrder: null,
  address: {
    street_name: '',
    building: '',
    house: '',
    flat: '',
    id: 0,
    full: '',
  },
};

export default function orderReducer(
  state = initialState,
  action: ordersTypes | AddressActionTypes,
) {
  switch (action.type) {
    case GET_LAST_ORDER:
      return {
        ...state,
        lastOrder: action.payload,
      };
    case SAVE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};


// Action Creators
export const getLastOrder = (): ThunkAction<
  void,
  RootState,
  unknown,
  ordersTypes
  > => async (dispatch) => {
  try {
    const order = await client.get('orders/last_order');
    return dispatch({
      type: GET_LAST_ORDER,
      payload: order.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createOrder = async (order: tempOrderTypes) => {
  try {
    const newOrder = await client.post('orders', order);
    return newOrder.data;
  } catch (err) {
    console.log(err);
  }
};

export const setNewAddressSave = (address: addressType) => {
  return {
    type: SET_ADDRESS,
    payload: {
      street_name: address.street_name || '',
      house: address.house || '',
      building: address.building || '',
      flat: address.flat || '',
      id: 0,
      full: '',
    }
  }
}
