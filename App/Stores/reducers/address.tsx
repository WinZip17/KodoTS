import {ThunkAction} from 'redux-thunk';
import {RootState} from '.';
import client from '../../Services/axiosSettinsg';
import {
  AddressActionTypes,
  addressesState,
  addressType,
} from '../../Types/addressesTypes';
import {errorNotification, successNotification} from '../../util/notifications';

// Actions
export const GET_ADDRESS_LIST = 'KodoTS/reducer/GET_ADDRESS_LIST';
export const SAVE_ADDRESS = 'KodoTS/reducer/SAVE_ADDRESS';

// Reducer
const initialState: addressesState = {
  list: [],
};
export default function addressesReducer(
  state = initialState,
  action: AddressActionTypes,
) {
  switch (action.type) {
    case GET_ADDRESS_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const getAddressesList = (): ThunkAction<
  void,
  RootState,
  unknown,
  AddressActionTypes
> => async (dispatch) => {
  try {
    const addresses = await client.get('/addresses');
    return dispatch({
      type: GET_ADDRESS_LIST,
      payload: addresses.data,
    });
  } catch (err) {
    errorNotification('Ошибка загрузки данных');
    console.log(err);
  }
};

export const saveAddresses = (
  data: addressType,
): ThunkAction<void, RootState, unknown, AddressActionTypes> => async (
  dispatch,
) => {
  try {
    const address = await client.post('/addresses', data);
    successNotification('Адрес сохранен');
    return dispatch({
      type: SAVE_ADDRESS,
      payload: address.data,
    });
  } catch (err) {
    if (
      err.response.data.house &&
      err.response.data.house === 'уже существует'
    ) {
      errorNotification(
        'Не удалось сохранить адрес, такой адрес уже существует',
      );
    } else {
      errorNotification(
        'Не удалось сохранить адрес, пожалуйста попробуйте еще раз',
      );
    }
    console.log(err);
  }
};
