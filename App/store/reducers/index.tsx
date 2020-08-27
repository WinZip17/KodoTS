import {combineReducers} from 'redux';
import user from './user.reducer';
import cart from './cart.reducer';
import menuList from './menuList.reducer';
import textBlocks from './textBlocks.reducer';
import banners from './banners.reducer';
import settings from './settings.reducer';
import labels from './labels.reducer';
import streets from './streets.reducer';
import order from './order.reducer';
import cartModal from './cartModal.reducer';

const reducers = combineReducers({
  cart,
  user,
  menuList,
  textBlocks,
  banners,
  settings,
  labels,
  streets,
  order,
  cartModal,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
