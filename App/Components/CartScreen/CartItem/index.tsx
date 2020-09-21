import React from 'react';
import {Image, TouchableOpacity, View, ViewStyle} from 'react-native';
import ListItem from '../../ListItem';
import cloneDeep from 'lodash-es/cloneDeep';
import size from 'lodash-es/size';
import intersection from 'lodash-es/intersection';
import {cartInfoType} from '../../../Types/cartTypes';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';
import * as Actions from '../../../Stores/reducers/Actions';
import {styles} from './CartItem.styles';
import icons from '../../../assets/icons';
import StringText from '../../ui/StringText/StringText';

type PropsTypes = {
  cardData: cartInfoType;
  missing: boolean;
  isHistory?: boolean;
  isCartScreen?: boolean;
  style?: ViewStyle;
  aquarium?: boolean;
};

const CartItem = (props: PropsTypes) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    cardData,
    missing,
    isHistory = false,
    isCartScreen,
    style,
    aquarium,
  } = props;

  const {item, count, options} = cardData;

  const iOptions = cloneDeep(
    item.options.filter(
      (o) =>
        size(
          intersection(
            o.values.map((v) => v.id),
            options.map((o) => o.id),
          ),
        ) >= 0,
    ),
  );

  iOptions.forEach((v) => {
    v.selectedValues = v.values.filter(
      (ov) => options.map((o) => o.id).indexOf(ov.id) !== -1,
    );
  });

  const missingStyles = missing ? styles.productMissing : {};

  let listItemStyles = {
    backgroundColor: 'none',
  };
  if (aquarium) {
    listItemStyles.backgroundColor = '#4b090d';
  }
  if (missing) {
    listItemStyles.backgroundColor = '#431015';
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        isHistory ? false : dispatch(Actions.showEdit(item, cardData.id))
      }>
      <ListItem
        onPress={() => {
          if (!isHistory) {
            navigation.navigate('Item', {id: item.id});
          }
        }}
        style={[styles.listItem, style, listItemStyles]}>
        <View style={styles.itemContainer}>
          <View
            style={[
              isCartScreen ? styles.itemLeft : styles.itemFull,
              missingStyles,
            ]}>
            <View style={[styles.itemContent, missingStyles]}>
              <StringText style={[styles.itemName, missingStyles]}>
                <StringText format="bold" style={missingStyles}>
                  {count}
                </StringText>
                {'\u00A0'}
                &times;
                {'\u00A0'}
                {item.name}
              </StringText>
              {!aquarium && (
                <StringText format="price" style={missingStyles}>
                  {`${item.price_int} \u20BD `}
                </StringText>
              )}
            </View>
            <StringText format="comments" style={missingStyles}>
              {item.desc}
            </StringText>

            <View style={[styles.itemOptions, missingStyles]}>
              {iOptions.map((o) => {
                return (
                  <View key={o.id} style={styles.itemOption}>
                    <View style={styles.itemOptionDot} />
                    <StringText format="opacity">
                      {`${o.name}: ${o.selectedValues
                        .map((sv) => sv.name)
                        .join(',')}`}
                    </StringText>
                  </View>
                );
              })}
            </View>

            {aquarium && (
              <View>
                <StringText style={styles.aquariumText}>
                  Требует уточнения, с вами свяжется менеджер
                </StringText>
              </View>
            )}
          </View>
          {isCartScreen && (
            <View style={styles.arrowBlock}>
              <TouchableOpacity
                style={styles.arrowTouch}
                onPress={() =>
                  dispatch(Actions.showEdit(cardData.item, cardData.id))
                }
                hitSlop={{top: 40, bottom: 40, left: 20, right: 20}}>
                <Image source={icons.icArrowRight} style={styles.arrow} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ListItem>
    </TouchableOpacity>
  );
};

export default CartItem;
