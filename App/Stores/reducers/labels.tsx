import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../../Services/axiosSettinsg';
import {labelsState, labelsTypes} from '../../Types/labelsTypes';
import keyBy from 'lodash-es/keyBy';

// Actions
export const GET_LABELS_LIST = 'KodoTS/reducer/GET_LABELS_LIST';

// Reducer
const initialState: labelsState = {
  labels: {},
};
export default function labelsReducer(
  state = initialState,
  action: labelsTypes,
) {
  switch (action.type) {
    case GET_LABELS_LIST:
      return {
        ...state,
        labels: keyBy(action.payload, 'id'),
      };
    default:
      return state;
  }
}

// Action Creators
export const getLabelsList = (): ThunkAction<
  void,
  RootState,
  unknown,
  labelsTypes
> => async (dispatch) => {
  try {
    const labels = await client.get('/labels');
    return dispatch({
      type: GET_LABELS_LIST,
      payload: labels.data,
    });
  } catch (err) {
    console.log(err);
  }
};
