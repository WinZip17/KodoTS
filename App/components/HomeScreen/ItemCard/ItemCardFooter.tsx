import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers';
import {styles} from './ItemCard.styles';
import { itemMenuInfo } from "../../../types/menuListTypes";
import StringText from "../../ui/StringText";

type PropsTypes = {
  item: itemMenuInfo;
};

const ItemCardFooter = ({item}: PropsTypes): JSX.Element => {
  return (
    <View style={styles.itemInner}>
      <View style={styles.itemInfo}>
        <View style={styles.itemText}>
          <StringText text={item.name || ''} />
        </View>
        {item.old_price_int && (
          <View style={styles.itemOldPrice}>
            <StringText
              style={styles.itemOldPrice}
              text={`${item.old_price_int} \u20BD`}
            />
          </View>
        )}
        <View style={styles.itemPrice}>
          <StringText text={`${item.price_int} \u20BD`} />
        </View>
      </View>
      <Text style={styles.itemDesc}>{item.desc}</Text>
    </View>
  );
};

export default ItemCardFooter;
