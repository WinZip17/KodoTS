import {combineReducers} from 'redux';
import user from './user.reducer';
import cart from './cart.reducer';
import menuList from './menuList.reducer';

const reducers = combineReducers({
  cart,
  user,
  menuList,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
