import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';
import sum from 'lodash-es/sum';
import map from 'lodash-es/map';
import property from 'lodash-es/property';

import icons from '../../../assets/icons/index';
import Buttons from '../../../Theme/Buttons';
import Preloader from '../../Preloader';

import * as Actions from '../../../Stores/reducers/Actions';

import {optionsItem} from '../../../Types/menuListTypes';
import {RootState} from '../../../Stores/reducers';
import {NativeSyntheticEvent} from 'react-native';
import {styles} from './ItemOptions.styles';
import RenderItemOptionsList from './RenderItemOptionsList';

const ItemOptions = () => {
  const dispatch = useDispatch();
  //переменная для определения cartItems, иначе ts ругается на возможный null
  const defaultId = useSelector((state: RootState) =>
    state.cartModal.item ? state.cartModal.item.id : 1,
  );
  const cartItems = useSelector((state: RootState) =>
    state.cart.items.filter((i) => i.item.id === defaultId),
  );

  const show = useSelector(
    (state: RootState) => state.cartModal.showEdit || state.cartModal.showAdd,
  );
  const showAdd = useSelector((state: RootState) => state.cartModal.showAdd);
  const cartId = useSelector((state: RootState) =>
    state.cartModal.cartId || cartItems.length > 0 ? cartItems[0].id : 0,
  );
  const item = useSelector((state: RootState) => state.cartModal.item);
  const isEdit = useSelector((state: RootState) => state.cartModal.showEdit);

  const [count, setCount] = useState(1);
  const [itemOptions, setItemOptions] = useState<optionsItem[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [priceAll, setPriceAll] = useState(0);
  const [scrollOffset, setScrollOffset] = useState<number | undefined>(
    undefined,
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const getCount = () => {
    return sum(map(cartItems, property('count')));
  };

  const optionDecrease = () => {
    if (count <= 1) {
      return;
    }
    const newCount = count - 1;
    setCount(newCount);
    item && item.price_int && setPriceAll(newCount * item.price_int);
  };

  const optionIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    item && item.price_int && setPriceAll(newCount * item.price_int);
  };

  useEffect(() => {
    if (item) {
      if (isEdit) {
        const count = getCount();
        setCount(count);
        setPriceAll(count * (item.price_int ? item.price_int : 0));
        setItemOptions(item.options ? item.options : []);
      }

      if (showAdd) {
        let options = (item && item.options) || [];
        setCount(1);
        setItemOptions(options);
        setPriceAll(item.price_int ? item.price_int : 0);
      }
    }
  }, [item, isEdit, showAdd]);

  const handleSubmitModal = () => {
    if (isEdit) {
      dispatch(Actions.editItemCount(count, cartId));
      dispatch(Actions.hideModal());
    } else if (item) {
      dispatch(Actions.addItem(item, count, itemOptions));
      showMessage({
        type: 'success',
        message: `${item.name} добавлен в корзину`,
      });
      dispatch(Actions.hideModal());
    }
  };

  const handleCloseBottomSheet = () => {
    dispatch(Actions.hideModal());
  };

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: number) => {
    scrollViewRef.current && scrollViewRef.current.scrollTo(p);
  };

  const currentItem = isEdit ? cartItems[0] : item;

  return (
    <Modal
      testID={'modal'}
      isVisible={show}
      onSwipeComplete={handleCloseBottomSheet}
      swipeDirection={['down']}
      style={styles.view}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
      propagateSwipe={true}
      onBackButtonPress={handleCloseBottomSheet}>
      <View style={styles.bottomSheetHeader}>
        <View style={styles.bottomSheetPanelHandle} />
      </View>
      {show && (
        <View style={styles.modalWrap}>
          <View style={styles.modalImgWrap}>
            <FastImage
              style={styles.modalImg}
              source={{
                uri: item && item.image !== null ? item.image : undefined,
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && <Preloader />}
          </View>
          <ScrollView
            style={styles.modalContainer}
            // @ts-ignore
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}>
            <Text style={styles.optionTitle}>{item && item.name}</Text>
            <View style={styles.modalInfo}>
              <View style={styles.optionCounter}>
                <TouchableOpacity onPress={optionDecrease}>
                  <Image
                    source={icons.icMinus}
                    style={[styles.optionCalcImg, {marginLeft: 0}]}
                  />
                </TouchableOpacity>
                <View style={styles.optionCalc}>
                  <Text style={styles.optionCalcText}>{count}</Text>
                </View>
                <TouchableOpacity onPress={optionIncrease}>
                  <Image source={icons.icPlus} style={styles.optionCalcImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textBold}>{`${priceAll} \u20BD`}</Text>
              </View>
            </View>
            <View style={styles.descWrap}>
              <Text style={styles.desc}>
                {item && item.desc ? item.desc : ''}
              </Text>
            </View>
            {show && currentItem && currentItem.options && item && (
              <RenderItemOptionsList
                isEdit={isEdit}
                cartItems={cartItems}
                item={item}
                itemOptions={itemOptions}
                setItemOptions={setItemOptions}
              />
            )}
          </ScrollView>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              onPress={handleSubmitModal}
              style={[Buttons.buttonMain, styles.buttonModal]}>
              <Text style={Buttons.buttonMainText}>
                {isEdit ? 'Изменить' : 'Добавить'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ItemOptions;
