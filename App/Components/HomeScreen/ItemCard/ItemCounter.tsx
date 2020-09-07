import {cartInfoType} from '../../../Types/cartTypes';
import sum from 'lodash-es/sum';
import map from 'lodash-es/map';
import property from 'lodash-es/property';
import * as Actions from '../../../Stores/reducers/Actions';
import {styles} from './ItemCard.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import icons from '../../../assets/icons';
import React, {useState} from 'react';
import ConfirmModal from '../../SharedComponents/ConfirmModal';
import each from 'lodash-es/each';
import {itemMenuInfo} from '../../../Types/menuListTypes';
import {useDispatch} from 'react-redux';

type ProtoTypes = {
  cartItems: cartInfoType[];
  handleSingleTap: () => void;
  item: itemMenuInfo;
};

const ItemCounter = ({cartItems, handleSingleTap, item}: ProtoTypes) => {
  const dispatch = useDispatch();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const getCount = () => {
    return sum(map(cartItems, property('count')));
  };

  const count = getCount();

  const optionDecrease = () => {
    if (count === 1) {
      setConfirmDeleteOpen(true);
    } else {
      dispatch(Actions.setItemCount(item, count - 1));
    }
  };

  return (
    <>
      {confirmDeleteOpen && (
        <ConfirmModal
          isVisible={confirmDeleteOpen}
          onYes={() => {
            each(cartItems, (it) => {
              dispatch(Actions.deleteItem(it.id));
            });
            setConfirmDeleteOpen(false);
          }}
          onDismiss={() => {
            setConfirmDeleteOpen(false);
          }}>
          Удалить товар из корзины?
        </ConfirmModal>
      )}
      <View style={styles.itemControlsWrap}>
        <TouchableOpacity onPress={handleSingleTap}>
          <Image source={icons.icPlusWhite} style={styles.optionCalcImg} />
        </TouchableOpacity>
        {count > 0 && (
          <>
            <View style={styles.optionCalc}>
              <Text style={styles.optionCalcText}>{count}</Text>
            </View>
            <TouchableOpacity onPress={optionDecrease}>
              <Image source={icons.icMinusWhite} style={styles.optionCalcImg} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default ItemCounter;
