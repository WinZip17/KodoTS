import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import client from '../axiosSettinsg';
import {GET_LAST_ORDER, ordersTypes} from '../../types/ordersTypes';

export const getLastOrder = (): ThunkAction<
  void,
  RootState,
  unknown,
  ordersTypes
> => async (dispatch) => {
  try {
    const order = await client.get('orders/last_order');
    dispatch({
      type: GET_LAST_ORDER,
      payload: order.data,
    });
  } catch (err) {
    console.log(err);
  }
};
