import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import icons from '../assets/icons';
import Colors from '../styles/colors';
import Buttons from '../styles/Buttons';

import * as Actions from '../store/reducers/Actions';

import RadioButton from './RadioButton';

import {showMessage} from 'react-native-flash-message';
import sum from 'lodash-es/sum';
import map from 'lodash-es/map';
import property from 'lodash-es/property';
import FastImage from 'react-native-fast-image';
import Preloader from './Preloader';

const isIos = Platform.OS === 'ios';

import {normalize} from '../util/screen';
import {optionsItem} from '../types/menuListTypes';
import {RootState} from '../store/reducers';
import {NativeSyntheticEvent} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
  modalWrap: {
    backgroundColor: Colors.backgroundItem,
    width: '100%',
    height: windowHeight - normalize(250),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    overflow: 'hidden',
  },
  modalContainer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  modalImg: {
    height: 250,
    marginBottom: 20,
  },
  modalImgWrap: {
    position: 'relative',
  },
  modalInfo: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  radioLabelColumn: {
    color: Colors.whiteText,
    marginLeft: 10,
    flex: 1,
    fontSize: 17,
  },
  RadioButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    zIndex: 1000000,
  },
  optionTitle: {
    color: Colors.whiteText,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
  optionsTitle: {
    color: Colors.whiteText,
    textTransform: 'uppercase',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  optionCounter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
    color: Colors.whiteText,
  },
  textBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    marginLeft: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descWrap: {
    display: 'flex',
    paddingTop: 20,
  },
  desc: {
    color: '#ffffff',
    opacity: 0.4,
  },
  optionCalc: {
    backgroundColor: '#ffcc00',
    width: 28,
    height: 28,
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCalcImg: {
    width: 28,
    height: 28,
    marginLeft: 11,
    marginRight: 11,
  },
  optionCalcText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
    width: '100%',
  },
  buttonModal: {
    marginTop: 25,
    marginBottom: 25,
  },
  buttonWrap: {
    borderTopColor: '#563712',
    borderStyle: 'solid',
    borderTopWidth: isIos ? 1 : 0,
  },
  bottomSheetHeader: {
    width: '100%',
    alignItems: 'center',
    padding: normalize(20),
    zIndex: 10000,
  },
  bottomSheetPanelHandle: {
    width: normalize(94),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: '#ffffff',
  },
});

const ItemOptions = () => {
  const dispatch = useDispatch();
  //переменная для определения cartItems, иначе ts на возможный null ругается
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
  const cartId = useSelector(
    (state: RootState) => state.cartModal.cartId || cartItems.length > 0 ? cartItems[0].id : 0,
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

  const scrollViewRef = useRef<HTMLDivElement>(null);

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

  const handleItemOptionChange = (index: number, value: number): void => {
    if (itemOptions) {
      const newItemOptions = [...itemOptions];
      const newItem = itemOptions.find((i) => i.id === value);
      newItem && newItemOptions.splice(index, 1, newItem);
      setItemOptions(newItemOptions);
    }
  };

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

  const renderItemOptions = () => {
    const currentItem = isEdit ? cartItems[0] : item;

    if (!currentItem || !currentItem.options) {
      return null;
    }
    const optionsList: optionsItem[] = currentItem.options;
    return (
      optionsList &&
      optionsList.map((data: optionsItem, index: number) => {
        return (
          <View key={index}>
            <Text style={styles.optionsTitle}>{data.name}</Text>
            {data.values &&
              data.values.map((values) => {
                const {id: value, name: text} = values;
                return (
                  <RadioButton
                    key={values.id}
                    valueState={
                      (isEdit && itemOptions[index].id) ||
                      (data.values[0] && data.values[0].id)
                    }
                    data={{text, value}}
                    onChange={(val: number) => {
                      handleItemOptionChange(index, val);
                    }}
                    orientation={styles.radioLabelColumn}
                    RadioButtonWrap={styles.RadioButtonWrap}
                  />
                );
              })}
          </View>
        );
      })
    );
  };

  const handleCloseBottomSheet = () => {
    dispatch(Actions.hideModal());
  };

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: number) => {
    // @ts-ignore
    scrollViewRef.current && scrollViewRef.current.scrollTo(p);
  };

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
            {show && renderItemOptions()}
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
