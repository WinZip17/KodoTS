import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers';
import client from '../axiosSettinsg';
import {GET_TEXT_LIST, TextBlocksTypes} from '../../types/textBlocksTypes';

export const getTextList = (): ThunkAction<
  void,
  RootState,
  unknown,
  TextBlocksTypes
> => async (dispatch) => {
  try {
    const textBlocksArr = await client.get('/text_blocks');
    dispatch({
      type: GET_TEXT_LIST,
      payload: textBlocksArr.data,
    });
  } catch (err) {
    console.log(err);
  }
};
