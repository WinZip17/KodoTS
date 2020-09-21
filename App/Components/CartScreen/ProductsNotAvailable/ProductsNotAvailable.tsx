import React from 'react';
import StringText from '../../ui/StringText/StringText';
import {styles} from '../cartScreen.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Stores/reducers';
import find from 'lodash-es/find';

type propsTypes = {
  missingIds: number[];
};

const ProductsNotAvailable = (props: propsTypes) => {
  const {missingIds} = props;
  const items = useSelector((state: RootState) => state.cart.items);

  if (missingIds.length == 0) {
    return null;
  }

  return (
    <StringText style={styles.productDisable}>
      Некоторые позиции недоступны для заказа:{' '}
      {missingIds.map((mi) => {
        let item = find(items, (it) => {
          return it.item.id === mi;
        });
        if (item) {
          return <StringText key={item.item.id}>{item.item.name}</StringText>;
        }
      })}
      . Удалите их из корзины, чтобы сделать заказ.
    </StringText>
  );
};

export default ProductsNotAvailable;
