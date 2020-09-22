import React from 'react';
import {Image, Text, View} from 'react-native';
import icons from '../assets/icons';
import {useSelector} from 'react-redux';
import {RootState} from '../Stores/reducers';
import map from 'lodash-es/map';
import sum from 'lodash-es/sum';
import property from 'lodash-es/property';

const CartIcon: React.FC = (): JSX.Element => {
  const itemsCount = useSelector((state: RootState) =>
    sum(map(state.cart.items, property('count'))),
  );

  return (
    <View>
      <Image
        source={icons.icCart}
        style={[{width: 30, height: 30}]}
        // tintColor={tintColor}
      />
      {itemsCount > 0 && (
        <Text
          style={{
            color: '#fff',
            backgroundColor: '#f00',
            borderRadius: 8,
            paddingTop: 2,
            position: 'absolute',
            width: 15,
            height: 15,
            fontSize: 8,
            textAlign: 'center',
            top: -3,
            right: -3,
            overflow: 'hidden',
          }}>
          {itemsCount}
        </Text>
      )}
    </View>
  );
};

export default CartIcon;
