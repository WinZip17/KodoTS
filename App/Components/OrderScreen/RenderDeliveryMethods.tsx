import React from 'react';
import styles from './OrderScreen.styles';
import {settingsType} from '../../Types/settingsTypes';
import {Text, View} from 'react-native';
import {deliveryMethods} from '../../Services/constants';
import RadioButton from '../ui/RadioButton';

type propsTypes = {
  total: () => number;
  settings: settingsType;
  delivery: string;
  setDelivery: (delivery: string) => void;
};

const RenderDeliveryMethods = (props: propsTypes): JSX.Element => {
  const {settings, delivery, setDelivery} = props;
  const total = props.total();
  const minDelivery = settings.min_order;

  if (total < minDelivery) {
    if (delivery != 'pickup') {
      setTimeout(() => setDelivery('pickup'));
    }

    return (
      <>
        <Text style={styles.productDeliveryText}>
          Заказ будет доступен только для самовывоза.
        </Text>
        <Text style={styles.productDeliveryText}>
          Для доставки не хватает {minDelivery - total} ₽.
        </Text>
      </>
    );
  } else {
    return (
      <View style={styles.typeDeliveryWrap}>
        {deliveryMethods.map((data) => {
          return (
            <RadioButton
              key={data.value}
              data={data}
              valueState={delivery}
              RadioButtonWrap={styles.RadioButtonWrap}
              onChange={(delivery) => {
                setDelivery(delivery.toString());
              }}
              orientation={styles.radioLabelRow}
            />
          );
        })}
      </View>
    );
  }
};

export default RenderDeliveryMethods;
