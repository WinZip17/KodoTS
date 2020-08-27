import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import client from '../axiosSettinsg';
import {GET_LABELS_LIST, labelsTypes} from '../../types/labelsTypes';

export const getLabelsList = (): ThunkAction<
  void,
  RootState,
  unknown,
  labelsTypes
> => async (dispatch) => {
  try {
    const labels = await client.get('/labels');
    dispatch({
      type: GET_LABELS_LIST,
      payload: labels.data,
    });
  } catch (err) {
    console.log(err);
  }
};
