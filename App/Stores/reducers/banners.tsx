import {bannersState, bannersTypes} from '../../Types/bannersTypes';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../../Services/axiosSettinsg';

// Actions
export const GET_BANNERS_LIST = 'KodoTS/reducer/GET_BANNERS_LIST';

// Reducer
const initialState: bannersState = {
  banners: [],
  loading: false,
};
export default function bannersReducer(
  state = initialState,
  action: bannersTypes,
) {
  switch (action.type) {
    case GET_BANNERS_LIST:
      return {
        ...state,
        banners: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const getBannersList = (): ThunkAction<
  void,
  RootState,
  unknown,
  bannersTypes
> => async (dispatch) => {
  try {
    const banners = await client.get('/banners');
    return dispatch({
      type: GET_BANNERS_LIST,
      payload: banners.data,
    });
  } catch (err) {
    console.log(err);
  }
};
