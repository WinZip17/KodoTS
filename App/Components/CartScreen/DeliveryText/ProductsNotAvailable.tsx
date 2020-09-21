import React from 'react';
import StringText from '../../ui/StringText/StringText';
import {styles} from '../cartScreen.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Stores/reducers';
import find from 'lodash-es/find';

type propsTypes = {
  total: number;
  minDelivery: number;
};

const DeliveryText = (props: propsTypes) => {
  const {total, minDelivery} = props;
  return (
    <>
      <StringText format="yellow" fontSize="p7">
        Заказ будет доступен только для самовывоза.
      </StringText>
      <StringText format="yellow" fontSize="p7">
        Для доставки не хватает {minDelivery - total} ₽.
      </StringText>
    </>
  );
};

export default DeliveryText;
