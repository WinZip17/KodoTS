import React, {useState} from 'react';

import {View, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';

import filter from 'lodash-es/filter';
import ListItem from '../../ListItem';
import ItemLabels from './ItemLabels';
import Preloader from '../../Preloader';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../../Stores/reducers/Actions';
import {RootState} from '../../../Stores/reducers';
import {itemMenuInfo} from '../../../Types/menuListTypes';
import {styles} from './ItemCard.styles';
import ItemCounter from './ItemCounter';
import ItemCardFooter from './ItemCardFooter';

type PropsType = {
  item: itemMenuInfo;
};

const ItemCard = (props: PropsType) => {
  const {item} = props;
  const cartItems = useSelector(
    (state: RootState) =>
      filter(state.cart.items, (i) => i.item.id === item.id) || [{count: 0}],
  );

  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleSingleTap = () => {
    if (cartItems.length > 0 && !item.options.length) {
      dispatch(Actions.showEdit(item, cartItems[0].id));
    } else {
      dispatch(Actions.showAdd(item));
    }
  };

  return (
    <ListItem style={styles.listItem}>
      <ItemCounter
        handleSingleTap={handleSingleTap}
        cartItems={cartItems}
        item={item}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleSingleTap}
        style={styles.itemContentWrap}>
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
        <ItemCardFooter item={item} />
      </TouchableOpacity>
    </ListItem>
  );
};

export default ItemCard;
