import React from 'react';
import styles from './OrderScreen.styles';
import {Text, View} from 'react-native';
import RadioButton from '../ui/RadioButton';
import size from 'lodash-es/size';
import {useSelector} from 'react-redux';
import {RootState} from '../../Stores/reducers';
import Address from '../SharedComponents/Address';
import {tempOrderTypes} from '../../Types/ordersTypes';

type propsTypes = {
  order: tempOrderTypes;
  setOrder: (order: tempOrderTypes) => void;
};

const RenderAddresses = (props: propsTypes): JSX.Element => {
  const {
    order,
    setOrder,
  } = props;

  const addresses = useSelector((state: RootState) => state.addresses.list);

  if (!addresses || size(addresses) == 0) {
    return (
      <Address />
    );
  }

  return (
    <View>
      <Text style={[styles.deliveryDesc, {marginBottom: 10}]}>
        Адрес доставки
      </Text>

      {addresses.map((address) => {
        return (
          <RadioButton
            key={address.id}
            data={{value: address.id, text: address.full}}
            valueState={order.address_id}
            RadioButtonWrap={styles.RadioButtonWrap}
            onChange={(value) => {
              setOrder({...order, address_id: value.toString()});
            }}
            orientation={styles.radioLabelColumn}
          />
        );
      })}

      <RadioButton
        key={'new'}
        data={{value: 'new', text: 'Новый адрес'}}
        valueState={order.address_id}
        RadioButtonWrap={styles.RadioButtonWrap}
        onChange={() => {
          setOrder({...order, address_id: 'new'});
        }}
        orientation={styles.radioLabelColumn}
      />

      {order.address_id === 'new' && (
        <Address />
      )}
    </View>
  );
};

export default RenderAddresses;
