import React, {useState} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';

import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import property from 'lodash-es/property';
import sum from 'lodash-es/sum';
import each from 'lodash-es/each';

import ListItem from './ListItem';
import ItemLabels from './ItemLabels';
import Preloader from './Preloader';
import icons from '../assets/icons';
import ConfirmModal from './ConfirmModal';
import colors from '../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';
import {RootState} from '../store/reducers';
import {itemMenuInfo} from '../types/menuListTypes';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    position: 'relative',
  },
  itemImageWrap: {
    flex: 1,
    minHeight: 220,
  },
  itemImage: {
    flex: 1,
  },
  itemInner: {
    backgroundColor: '#3b2327',
    padding: 15,
  },
  itemInfo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
  },
  itemText: {
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
  },
  itemPriceWrap: {
    flexDirection: 'row',
    flex: 1,
    flexShrink: 1,
    justifyContent: 'flex-end',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    marginLeft: 5,
  },
  itemOldPrice: {
    marginLeft: 5,
    fontWeight: 'normal',
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    color: '#ffcc00',
    textAlign: 'right',
    textDecorationLine: 'line-through',
  },
  itemDesc: {
    color: '#b6adaf',
  },
  itemControlsWrap: {
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 10,
    alignItems: 'center',
    width: 60,
    height: 170,
    zIndex: 10,
  },
  itemContentWrap: {
    zIndex: 1,
    flex: 1,
  },
  optionCalc: {
    backgroundColor: colors.buttonMain,
    width: 35,
    height: 35,
    borderRadius: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  optionCalcImg: {
    width: 41,
    height: 41,
  },
  optionCalcText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    width: '100%',
  },
});

type PropsType = {
  item: itemMenuInfo;
};

const ItemCard = (props: PropsType) => {
  const {item} = props;
  const cartItems = useSelector(
    (state: RootState) =>
      filter(state.cart.cart, (i) => i.item.id === item.id) || [{count: 0}],
  );
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();

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

  const handleSingleTap = () => {
    if (cartItems.length > 0 && !item.options.length) {
      dispatch(Actions.showEdit(item, cartItems[0].id));
    } else {
      dispatch(Actions.showAdd(item));
    }
  };

  return (
    <ListItem style={styles.listItem}>
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

      {!item.options.length && (
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
                <Image
                  source={icons.icMinusWhite}
                  style={styles.optionCalcImg}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      <TouchableOpacity activeOpacity={1} style={styles.itemContentWrap}>
        <TouchableOpacity activeOpacity={1} onPress={handleSingleTap}>
          <View style={styles.itemImageWrap}>
            {item.image && (
              <>
                <FastImage
                  style={styles.itemImage}
                  source={{uri: item.image}}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && <Preloader />}
              </>
            )}
            <ItemLabels labelIds={item.label_ids} />
          </View>
          <View style={styles.itemInner}>
            <View style={styles.itemInfo}>
              <View style={styles.itemText}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              {item.old_price_int && (
                <View style={styles.itemOldPrice}>
                  <Text style={styles.itemOldPrice}>
                    {`${item.old_price_int} \u20BD`}
                  </Text>
                </View>
              )}
              <View style={styles.itemPrice}>
                <Text style={styles.itemPrice}>
                  {`${item.price_int} \u20BD`}
                </Text>
              </View>
            </View>
            <Text style={styles.itemDesc}>{item.desc}</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </ListItem>
  );
};

export default ItemCard;
