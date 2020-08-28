import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import {ordersState, ordersTypes} from '../../types/ordersTypes';
import client from '../axiosSettinsg';

// Actions
export const GET_LAST_ORDER = 'KodoTS/reducer/GET_LAST_ORDER';

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
  },
};
export default function orderReducer(state = initialState, action: ordersTypes) {
  switch (action.type) {
    case GET_LAST_ORDER:
      return {
        ...state,
        lastOrder: action.payload,
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
