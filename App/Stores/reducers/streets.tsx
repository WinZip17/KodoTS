import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../../Services/axiosSettinsg';
import {streetsState, streetsTypes} from '../../Types/streetsTypes';

// Actions
export const GET_STREET_LIST = 'KodoTS/reducer/GET_STREET_LIST';

// Reducer
const initialState: streetsState = {
  streets: [],
};
export default function streetsReducer(
  state = initialState,
  action: streetsTypes,
) {
  switch (action.type) {
    case GET_STREET_LIST:
      return {
        ...state,
        streets: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const getStreetsList = (): ThunkAction<
  void,
  RootState,
  unknown,
  streetsTypes
> => async (dispatch) => {
  try {
    const streets = await client.get('/streets');
    return dispatch({
      type: GET_STREET_LIST,
      payload: streets.data,
    });
  } catch (err) {
    console.log(err);
  }
};
