import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from 'react-navigation-hooks';

import map from 'lodash-es/map';
import property from 'lodash-es/property';
import difference from 'lodash-es/difference';

import CartClearModal from './CartClearModal';
import {styles} from './cartScreen.styles';
import {RootState} from '../../Stores/reducers';
import icons from '../../assets/icons';
import * as Actions from '../../Stores/reducers/Actions';
import CartItem from './CartItem';
import StringText from '../ui/StringText/StringText';
import ProductsNotAvailable from './ProductsNotAvailable/ProductsNotAvailable';
import DeliveryText from './DeliveryText/ProductsNotAvailable';
import OrderShowScreen from '../../Screens/OrderShowScreen';
import EmptyCartText from './EmptyCartText/EmptyCartText';

const isIos = Platform.OS === 'ios';

const CartScreenComponent: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [borderRadius, setBorderRadius] = useState(isIos ? 8 : 4);
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.user);
  const minDelivery = useSelector(
    (state: RootState) => state.settings.settings.min_order,
  );
  const lastOrder = useSelector((state: RootState) => state.order.lastOrder);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(Actions.getLastOrder());
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setParams({cartItems: items});
  }, [items]);

  const allItemIds: number[] = useSelector((state: RootState) =>
    map(state.menuList.items, property('id')),
  );

  const missingIds = (): number[] => {
    let itemIds: number[] = map(map(items, property('item')), property('id'));
    return difference(itemIds, allItemIds);
  };

  const total = (): number => {
    const total = Object.values(items)
      .map(({item, count}) => {
        return count * (item.price_int ? item.price_int : 0);
      })
      .reduce((prev, current) => prev + current, 0);

    return total;
  };

  const totalWithoutDiscount = (): number => {
    return Object.values(items)
      .map(({item, count}) => {
        const old_price_int = item.old_price_int
          ? Number(item.old_price_int)
          : 0;
        const price_int = item.price_int ? Number(item.price_int) : 0;
        return old_price_int ? count * old_price_int : count * price_int;
      })
      .reduce((prev, current) => prev + current, 0);
  };

  const totalWithDiscount = total();

  const discountAmount = totalWithoutDiscount() - totalWithDiscount;

  const discountPercent =
    discountAmount &&
    Math.floor((discountAmount / totalWithoutDiscount()) * 100);

  const startOrder = () => {
    if (!user || !!user.name) {
      navigation.navigate('Order');
    } else {
      navigation.navigate('AuthScreen', {
        returnToScreen: 'Order',
        returnToStack: 'Order',
      });
    }
  };

  if (items.length === 0) {
    if (lastOrder) {
      const timeDif =
        +new Date() - +new Date(lastOrder.ready_time) > 1000 * 60 * 30;

      switch (lastOrder.state) {
        case 'unconfirmed':
        case 'confirmed':
        case 'cooking':
        case 'sent':
        case !timeDif && 'delivered':
        case 'ready':
        case 'assembled':
          return <OrderShowScreen />;
        default:
          break;
      }
      if (lastOrder.state === 'finished' && lastOrder.rate === null) {
        return <OrderShowScreen />;
      }
    }

    return <EmptyCartText />;
  }

  return (
    <View style={styles.productMain}>
      <CartClearModal />
      <SwipeListView
        useFlatList
        data={items}
        keyExtractor={(item) => `${item.id}`}
        onRowOpen={() => {
          setBorderRadius(0);
        }}
        onRowClose={() => {
          setBorderRadius(isIos ? 8 : 4);
        }}
        renderItem={(rowData) => {
          const {item} = rowData;
          let missing = false;
          if (missingIds().indexOf(item.item.id) !== -1) {
            missing = true;
          }

          return (
            <SwipeRow
              rightOpenValue={-60}
              style={{
                ...styles.productRow,
                borderTopRightRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
              }}
              stopRightSwipe={-60}
              disableRightSwipe>
              <View style={styles.productContainer}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(Actions.deleteItem(item.id));
                  }}
                  style={styles.productBasketField}>
                  <Image source={icons.icDelete} style={styles.productBasket} />
                </TouchableOpacity>
              </View>
              <View>
                <CartItem
                  cardData={item}
                  style={{
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                  }}
                  missing={missing}
                  isCartScreen
                  aquarium={item.item.is_aquarium}
                />
              </View>
            </SwipeRow>
          );
        }}
      />
      {!!discountPercent && (
        <View style={styles.productTotalContainer}>
          <StringText>Скидка {discountPercent}%</StringText>
          <StringText>
            {discountAmount} {'\u20BD'}
          </StringText>
        </View>
      )}
      <View style={styles.productTotalContainer}>
        <StringText fontSize="p6">Итого</StringText>
        <StringText fontSize="p6">
          {totalWithDiscount} {'\u20BD'}
        </StringText>
      </View>
      <View style={styles.productDeliveryContainer}>
        <ProductsNotAvailable missingIds={missingIds()} />
        {total() < minDelivery && (
          <DeliveryText total={total()} minDelivery={minDelivery} />
        )}
      </View>
      <TouchableOpacity onPress={startOrder} style={styles.productBuyWrapper}>
        <StringText style={styles.productBuy}>Оформить</StringText>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreenComponent;
