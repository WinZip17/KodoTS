import {combineReducers} from 'redux';
import user from './user';
import cart from './cart';
import menuList from './menuList';
import textBlocks from './textBlock';
import banners from './banners';
import settings from './settings';
import labels from './labels';
import streets from './streets';
import order from './orders';
import cartModal from './cartModal';
import addresses from './address';
import scroll from './scroll';

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
  addresses,
  scroll,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
