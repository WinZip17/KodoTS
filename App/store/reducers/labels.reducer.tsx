import {
  GET_LABELS_LIST,
  labelsState,
  labelsTypes,
} from '../../types/labelsTypes';

const initialState: labelsState = {
  labels: [],
};

const labelsReducer = function (state = initialState, action: labelsTypes) {
  switch (action.type) {
    case GET_LABELS_LIST:
      return {
        ...state,
        labels: action.payload,
      };
    default:
      return state;
  }
};

export default labelsReducer;
