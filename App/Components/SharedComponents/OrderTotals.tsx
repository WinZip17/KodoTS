import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {orderType, tempOrderTypes} from '../../Types/ordersTypes';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootState} from '../../Stores/reducers';

const styles = StyleSheet.create({
  priceInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
  },
  priceInfoCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    color: Colors.whiteText,
  },
  priceInfoText: {
    color: Colors.whiteText,
    lineHeight: 20,
    fontSize: 17,
    marginTop: 15,
    zIndex: -10,
  },
  priceInfoTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

type PropsType = {
  order: orderType | tempOrderTypes;
  total: number;
  styleWrap?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
};

const OrderTotals = (props: PropsType): JSX.Element => {
  const {order, total, styleWrap, styleText} = props;

  const settings = useSelector((state: RootState) => state.settings.settings);
  const user = useSelector((state: RootState) => state.user.user);

  let discount_percent = 0;
  let discount_kind = '';
  if (!user || !user.id || user.first_order) {
    discount_kind = 'за первый заказ';
    discount_percent = settings.first_order_discount_percent;
  } else if (order && 'delivery' in order && order.delivery === 'pickup') {
    discount_kind = 'за самовывоз';
    discount_percent = settings.pickup_discount_percent;
  } else {
    discount_percent = 0;
    discount_kind = '';
  }

  let sum = total;
  let discount_amount = total * (discount_percent / 100);
  let new_total = sum - discount_amount;

  return (
    <View style={[styles.priceInfo, styleWrap]}>
      <View style={styles.priceInfoCell}>
        <Text style={styles.priceInfoText}>Сумма заказа</Text>
        <Text style={styles.priceInfoText}>
          {sum ? sum.toFixed(2) : 0} {'\u20BD'}
        </Text>
      </View>
      <View style={styles.priceInfoCell}>
        <Text style={styles.priceInfoText}>
          Скидка {discount_kind} {discount_percent}%
        </Text>
        <Text style={styles.priceInfoText}>
          {discount_amount.toFixed(2)} {'\u20BD'}
        </Text>
      </View>
      <View style={styles.priceInfoCell}>
        <Text
          style={[styles.priceInfoText, styles.priceInfoTextBold, styleText]}>
          Итого
        </Text>
        <Text
          style={[styles.priceInfoText, styles.priceInfoTextBold, styleText]}>
          {new_total ? new_total.toFixed(2) : 0} {'\u20BD'}
        </Text>
      </View>
    </View>
  );
};

export default OrderTotals;
