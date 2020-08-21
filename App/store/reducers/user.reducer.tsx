import {GET_USER_DATA, UserActionTypes, UserState} from '../../types/userTypes';

const initialState: UserState = {
  loading: false,
  user: null,
};

const userReducer = function (state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case GET_USER_DATA:
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default userReducer;
