import {
  bannersState,
  bannersTypes,
  GET_BANNERS_LIST,
} from '../../types/bannersTypes';

const initialState: bannersState = {
  banners: [],
  loading: false,
};

const bannersReducer = function (state = initialState, action: bannersTypes) {
  switch (action.type) {
    case GET_BANNERS_LIST:
      return {
        ...state,
        banners: action.payload,
      };
    default:
      return state;
  }
};

export default bannersReducer;
