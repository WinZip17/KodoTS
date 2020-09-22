import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import {scrollState, scrollTypes} from '../../Types/scrollAutocompleteTypes';

// Actions
export const AUTOCOMPLETE_SHOW = 'KodoTS/reducer/AUTOCOMPLETE_SHOW';
export const AUTOCOMPLETE_HIDE = 'KodoTS/reducer/AUTOCOMPLETE_HIDE';

// Reducer
const initialState: scrollState = {
  stopScrollParent: false,
  hideAutocompleteResult: true,
};

export default function scrollReducer(
  state = initialState,
  action: scrollTypes,
) {
  switch (action.type) {
    case AUTOCOMPLETE_SHOW:
      return {
        ...state,
        stopScrollParent: action.payload,
        hideAutocompleteResult: false,
      };
    case AUTOCOMPLETE_HIDE:
      return {
        ...state,
        stopScrollParent: false,
        hideAutocompleteResult: true,
      };
    default:
      return state;
  }
}

// Action Creators
export const handleAutocompleteShow = (
  stopScrollParent: boolean,
): ThunkAction<void, RootState, unknown, scrollTypes> => (dispatch) => {
  return dispatch({
    type: AUTOCOMPLETE_SHOW,
    payload: stopScrollParent,
  });
};

export const handleAutocompleteHide = (): ThunkAction<
  void,
  RootState,
  unknown,
  scrollTypes
> => (dispatch) => {
  return dispatch({
    type: AUTOCOMPLETE_HIDE,
  });
};
