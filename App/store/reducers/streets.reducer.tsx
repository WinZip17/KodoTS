import {
  GET_STREET_LIST,
  streetsState,
  streetsTypes,
} from '../../types/streetsTypes';

const initialState: streetsState = {
  streets: [],
};

const streetsReducer = function (state = initialState, action: streetsTypes) {
  switch (action.type) {
    case GET_STREET_LIST:
      return {
        ...state,
        streets: action.payload,
      };
    default:
      return state;
  }
};

export default streetsReducer;
