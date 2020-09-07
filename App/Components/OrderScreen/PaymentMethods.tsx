import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './OrderScreen.styles';
import RadioButton from '../ui/RadioButton';
import ListItem from '../ListItem';
import {tempOrderTypes} from '../../Types/ordersTypes';
import Input from '../../Theme/Input';
import {paymentMethods} from '../../Services/constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../Stores/reducers';
// @ts-ignore
import TinkoffASDK from 'react-native-tinkoff-asdk';

type propsTypes = {
  order: tempOrderTypes;
  setOrder: (order: tempOrderTypes) => void;
  readyMinutes: () => number;
  total: () => number;
};

const PaymentMethods = (props: propsTypes): JSX.Element => {
  const {order, setOrder, readyMinutes} = props;
  const total = props.total();
  const [hasApplePay, setHasApplePay] = useState(false);

  useEffect(() => {
    TinkoffASDK.isPayWithAppleAvailable().then((r: any) => {
      if (r) {
        setHasApplePay(true);
      }
    });
  }, []);

  const {
    max_price_without_prepayment,
    max_delivery_time_without_prepayment,
  } = useSelector((state: RootState) => state.settings.settings);

  const getPaymentMethods = () => {
    let allPaymentMethods = [...paymentMethods];

    if (
      readyMinutes() > max_delivery_time_without_prepayment ||
      total > max_price_without_prepayment
    ) {
      allPaymentMethods = allPaymentMethods.filter(
        (item) => item.value === 'online',
      );
    }
    if (hasApplePay) {
      allPaymentMethods.push({
        text: 'Apple Pay',
        value: 'apple-pay',
      });
    }
    return allPaymentMethods;
  };

  const handleChangeFrom = () => {
    if (total > Number(order.change_from)) {
      setOrder({...order, change_from: total.toString()});
    }
  };

  return (
    <ListItem style={styles.marginDestroy}>
      <View style={styles.deliveryWrap}>
        <View>
          {getPaymentMethods().map((data) => {
            return (
              <View key={data.value}>
                <RadioButton
                  data={data}
                  valueState={order.payment}
                  RadioButtonWrap={styles.RadioButtonWrap}
                  orientation={styles.radioLabelColumn}
                  onChange={(payment) => {
                    setOrder({...order, payment: payment.toString()});
                  }}
                />
                {data.value === 'cash' && order.payment === 'cash' && (
                  <TextInput
                    placeholder="Сдача с суммы"
                    style={[Input.inputMain, styles.inputBoxPay]}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType={'numeric'}
                    returnKeyType="done"
                    value={order.change_from}
                    onChangeText={(change_from) => {
                      setOrder({...order, change_from});
                    }}
                    blurOnSubmit
                    onBlur={handleChangeFrom}
                  />
                )}
              </View>
            );
          })}
          {total > max_price_without_prepayment && (
            <Text style={styles.text}>
              Заказ на сумму свыше {max_price_without_prepayment} рублей
              принимается только по предоплате
            </Text>
          )}
        </View>
      </View>
    </ListItem>
  );
};

export default PaymentMethods;
