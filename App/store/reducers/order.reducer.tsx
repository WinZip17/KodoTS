import {
  GET_LAST_ORDER,
  ordersState,
  ordersTypes,
} from '../../types/ordersTypes';

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

const orderReducer = function (state = initialState, action: ordersTypes) {
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

export default orderReducer;
