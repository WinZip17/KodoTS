import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';

import addMinutes from 'date-fns/addMinutes';
import map from 'lodash-es/map';
import max from 'lodash-es/max';
import size from 'lodash-es/size';

import {orderType, tempOrderTypes} from '../../Types/ordersTypes';
import {RootState} from '../../Stores/reducers';
import * as Actions from '../../Stores/reducers/Actions';
import {createOrder} from '../../Stores/reducers/orders';

import icons from '../../assets/icons';
import Buttons from '../../Theme/Buttons';
import styles from './OrderScreen.styles';
import Input from '../../Theme/Input';

import ListItem from '../ListItem';
import RenderDeliveryMethods from './RenderDeliveryMethods';
import RenderAddresses from './RenderAddresses';
import {handleAutocompleteHide} from '../../Stores/reducers/scroll';
import AquariumPopup from './AquariumPopup';
import {payTinkoff, payWithApplePay} from '../../util/tinkoff';
import ReadyTimeOrder from './ReadyTimeOrder';
import OrderTotals from '../SharedComponents/OrderTotals';
import PaymentMethods from './PaymentMethods';
import Checkbox from './Checkbox';

const OrderScreenComponent = (): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const stopScrollParent = useSelector((state: RootState) => state.scroll.stopScrollParent);
  const user = useSelector((state: RootState) => state.user.user);
  const items = useSelector((state: RootState) => state.cart.items);
  const settings = useSelector((state: RootState) => state.settings.settings);
  const address = useSelector((state: RootState) => state.order.address);

  const commentField = useRef<TextInput>(null);
  const scrollView = useRef<ScrollView>(null);
  const sendButton = useRef<View>(null);

  const [sending, setSending] = useState(false);
  const [orderFromBackend, setOrderFromBackend] = useState<null | orderType>(
    null,
  );
  const [hasAquarium, setHasAquarium] = useState(false);
  const [isAllAquarium, setIsAllAquarium] = useState(false);
  const [timeToReadyOpen, setTimeToReadyOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [delivery, setDelivery] = useState('delivery');
  const [order, setOrder] = useState<tempOrderTypes>({
    people: 1,
    payment: 'online',
    contactless: false,
    delivery_option: '1',
    address_id: '',
    address: null,
    ready_time: new Date(),
    change_from: '',
    comment: '',
    delivery: '',
    line_items: [],
  });

  const loggedIn = user ? user.id : 0;

  useEffect(() => {
    setMinReady();
    const aquariumCount = items.filter((item) => item.item.is_aquarium).length;
    if (aquariumCount > 0) {
      setOrder({
        ...order,
        delivery: 'pickup',
        payment: 'cash',
        ready_time: minReadyTime(),
      });
      setHasAquarium(true);
      setIsAllAquarium(aquariumCount === items.length);
      if (aquariumCount === items.length) {
        sendOrder();
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      dispatch(Actions.getAddressesList());
    }
    setMinReady();
  }, [user]);

  const setMinReady = () => {
    if (!order.ready_time) {
      let mr = minReadyTime();
      if (mr) {
        setOrder({...order, ready_time: mr});
      }
    }
  };

  const personDecrease = () => {
    if (order.people <= 1) {
      return;
    }
    setOrder({...order, people: order.people - 1});
  };

  const personIncrease = () => {
    setOrder({...order, people: order.people + 1});
  };

  const total = (): number => {
    const total = Object.values(items)
      .map(({item, count}) => {
        const price_int: number = item.price_int ? item.price_int : 0;
        return count * price_int;
      })
      .reduce((prev, current) => prev + current, 0);
    return total;
  };

  const readyMinutes = () => {
    let totalItems = max(map(items, (i) => i.item.cook_time));
    return (totalItems || 55) + 15;
  };

  const minReadyTime = () => {
    return addMinutes(new Date(), readyMinutes());
  };

  const handleOpenClock = () => {
    setTimeToReadyOpen(!timeToReadyOpen);
  };

  const handleCommentInputFocus = () => {
    const height = Dimensions.get('window').height;
    commentField.current &&
      commentField.current.measure((ox, oy, w, h, px, py) => {
        scrollView.current &&
          scrollView.current.scrollTo({
            x: 0,
            y: py + h - height * 0.25,
            animated: true,
          });
      });
  };

  const handleButtonOpacity = (reset: boolean) => {
    sendButton.current &&
      sendButton.current.setNativeProps({
        opacity: reset ? 1 : 0.5,
      });
    setSending(!reset);
  };

  const formValid = () => {
    if (order.delivery === 'delivery') {
      if (!order.address_id || order.address_id == 'new') {
        if (!address.street_name) {
          Alert.alert('Ошибка', 'Не выбрана улица. Нельзя отправить адрес');
          handleButtonOpacity(true);
          return false;
        }
      }
    }
    return true;
  };

  const onOrderSuccess = (order: orderType) => {
    dispatch(Actions.cartClear());
    if (!isAllAquarium) {
      navigation.navigate('CartScreen', {id: order.id});
    }
  };

  const pay = () => {
    const userNew = {...user};
    if (orderFromBackend) {
      payTinkoff(orderFromBackend, userNew)
        .then((result: any) => {
          console.log('tinkoff result', result);
          result !== 0 && onOrderSuccess(result);
        })
        .catch((err: any) => {
          handleButtonOpacity(true);
          Alert.alert('Оплата не прошла, попробуйте ещё раз');
          console.log(err);
        });
    }
  };

  const sendOrder = () => {
    if (!formValid()) {
      handleButtonOpacity(true);
      return;
    }
    if (orderFromBackend && order.payment === 'online') {
      return pay();
    }
    if (orderFromBackend && order.payment === 'apple-pay') {
      return payWithApplePay(orderFromBackend);
    }

    let newOrder = Object.assign({}, order);
    // @ts-ignore
    newOrder.line_items = map(items, (v) => {
      return {
        ...items,
        item_id: v.item.id,
        count: v.count,
        value_ids: v.options,
      };
    });

    if (size(newOrder.line_items) == 0) {
      throw new Error('В корзине нет товаров');
    }

    if (newOrder.delivery === 'delivery') {
      newOrder.address = address;
    }

    if (newOrder.payment !== 'cash') {
      delete newOrder.change_from;
    }

    if (newOrder.contactless) {
      newOrder.comment += '\r\n\r\nБесконтактная доставка';
    }

    delete newOrder.contactless;
    createOrder(order)
      .then((r) => {
        if (order.payment === 'online' || order.payment === 'apple-pay') {
          setOrderFromBackend(r.data);
        } else {
          onOrderSuccess(r.payload.data);
          dispatch(
            Actions.setNewAddressSave({
              street_name: '',
              building: '',
              house: '',
              flat: '',
              id: 0,
              full: '',
            }),
          );
        }
      })
      .catch((e) => {
        console.log('enamble');
        handleButtonOpacity(true);
        console.log(e.error.response);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: '#2c1217',
      }}>
      {hasAquarium && <AquariumPopup disableClose={isAllAquarium} />}
      <ScrollView
        style={styles.listWrap}
        ref={scrollView}
        scrollEnabled={!stopScrollParent}>
        <View
          onStartShouldSetResponder={() => {
            dispatch(handleAutocompleteHide());
            return true;
          }}>
          {(!loggedIn || (user && !user.name) || (user && !user.email)) && (
            <ListItem>
              {(!loggedIn || (user && !user.name)) && (
                <TextInput
                  placeholder="Ваше имя"
                  style={[Input.inputMain, styles.inputBox, Input.inputCover]}
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={name}
                  onChangeText={setName}
                />
              )}

              {!loggedIn && (
                <TextInput
                  placeholder="Номер телефона"
                  style={[Input.inputMain, styles.inputBox, Input.inputCover]}
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={phone}
                  onChangeText={setPhone}
                />
              )}
            </ListItem>
          )}

          {(loggedIn || (user && user.name)) && (
            <ListItem>
              <View style={styles.personCountWrap}>
                <Text style={styles.textPerson}>Количество персон</Text>
                <View style={styles.personCounter}>
                  <TouchableOpacity onPress={personDecrease}>
                    <Image
                      source={icons.icMinus}
                      style={styles.personCalcImg}
                    />
                  </TouchableOpacity>
                  <View style={styles.personCalc}>
                    <Text style={styles.personCalcText}>{order.people}</Text>
                  </View>
                  <TouchableOpacity onPress={personIncrease}>
                    <Image source={icons.icPlus} style={styles.personCalcImg} />
                  </TouchableOpacity>
                </View>
              </View>
            </ListItem>
          )}

          <ListItem>
            <View style={styles.deliveryWrap}>
              <RenderDeliveryMethods
                total={total}
                settings={settings}
                delivery={delivery}
                setDelivery={setDelivery}
              />
              {delivery === 'delivery' && (
                <RenderAddresses order={order} setOrder={setOrder} />
              )}
              {delivery === 'pickup' && (
                <Text style={styles.deliveryDesc}>
                  {settings.pickup_address}
                </Text>
              )}
            </View>
          </ListItem>

          <ReadyTimeOrder
            order={order}
            timeToReadyOpen={timeToReadyOpen}
            handleOpenClock={handleOpenClock}
            setOrder={setOrder}
            minReadyTime={minReadyTime()}
          />

          <ListItem style={styles.marginDestroy}>
            <OrderTotals total={total()} order={order} />
          </ListItem>

          <PaymentMethods
            order={order}
            setOrder={setOrder}
            readyMinutes={readyMinutes}
            total={total}
          />

          <ListItem style={styles.marginDestroy}>
            <View style={styles.personCountWrap}>
              <Checkbox
                text="Бесконтактная доставка"
                valueState={order.contactless || false}
                CheckboxWrap={styles.RadioButtonWrap}
                orientation={styles.radioLabelColumn}
                onChange={(contactless) => {
                  setOrder({...order, contactless});
                }}
              />
            </View>
            <Text style={styles.radioLabelRowContactless}>
              Наш курьер свяжется с вами и оставит заказ у двери
            </Text>
          </ListItem>

          <ListItem style={styles.marginDestroy}>
            <TextInput
              ref={commentField}
              multiline={true}
              placeholderTextColor="rgba(255,255,255,0.4)"
              placeholder="Комментарий к заказу"
              style={Input.inputArea}
              value={order.comment}
              onChangeText={(comment) => {
                setOrder({...order, comment});
              }}
              onFocus={handleCommentInputFocus}
              blurOnSubmit
            />
          </ListItem>

          <View style={styles.orderButtonWrap}>
            <TouchableOpacity
              disabled={sending}
              onPress={sendOrder}
              onPressOut={() => handleButtonOpacity(false)}>
              <View ref={sendButton} style={Buttons.buttonMain}>
                <Text style={Buttons.buttonMainText}>Отправить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OrderScreenComponent;
