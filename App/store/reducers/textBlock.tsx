import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import {TextBlocksState, TextBlocksTypes} from '../../types/textBlocksTypes';
import client from '../axiosSettinsg';

// Actions
export const GET_TEXT_LIST = 'KodoTS/reducer/GET_TEXT_LIST';

// Reducer
const initialState: TextBlocksState = {
  loading: false,
  data: {
    NonStandard: {
      content: '',
      id: 0,
      slug: ',',
    },
    UserAgreement: {
      content: '',
      id: 0,
      slug: ',',
    },
  },
};
export default function textBlocksReducer(
  state = initialState,
  action: TextBlocksTypes,
) {
  switch (action.type) {
    case GET_TEXT_LIST:
      return {
        ...state,
        data: {
          NonStandard: action.payload.find((i) => i.slug === 'NonStandard'),
          UserAgreement: action.payload.find((i) => i.slug === 'UserAgreement'),
        },
      };
    default:
      return state;
  }
}

// Action Creators
export const getTextList = (): ThunkAction<
  void,
  RootState,
  unknown,
  TextBlocksTypes
> => async (dispatch) => {
  try {
    const textBlocksArr = await client.get('/text_blocks');
    return dispatch({
      type: GET_TEXT_LIST,
      payload: textBlocksArr.data,
    });
  } catch (err) {
    console.log(err);
  }
};
