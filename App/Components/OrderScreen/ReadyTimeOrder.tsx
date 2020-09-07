import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import isBefore from 'date-fns/isBefore';
import styles from './OrderScreen.styles';
import RadioButton from '../ui/RadioButton';
import ListItem from '../ListItem';
import {tempOrderTypes} from '../../Types/ordersTypes';
import colors from '../../Theme/colors';
import {showMessage} from 'react-native-flash-message';
import Buttons from '../../Theme/Buttons';

type propsTypes = {
  order: tempOrderTypes;
  timeToReadyOpen: boolean;
  handleOpenClock: () => void;
  setOrder: (order: tempOrderTypes) => void;
  minReadyTime: Date;
};

const ReadyTimeOrder = (props: propsTypes): JSX.Element => {
  const {
    order,
    timeToReadyOpen,
    handleOpenClock,
    setOrder,
    minReadyTime,
  } = props;

  const scrollView = useRef<ScrollView>(null);

  const handleDatepickerLayout = (e: LayoutChangeEvent) => {
    if (Platform.OS === 'ios') {
      const height = Dimensions.get('window').height;
      scrollView.current &&
        scrollView.current.scrollTo({
          x: 0,
          y:
            e.nativeEvent.layout.y +
            e.nativeEvent.layout.height -
            height * 0.25,
          animated: true,
        });
    }
  };

  return (
    <ListItem header="Время готовности заказа">
      <>
        <View style={styles.deliveryWrap}>
          <RadioButton
            data={{text: 'Как можно быстрее', value: '1'}}
            valueState={order.delivery_option}
            RadioButtonWrap={styles.RadioButtonWrap}
            onChange={(delivery_option) => {
              if (timeToReadyOpen) {
                handleOpenClock();
              }
              setOrder({
                ...order,
                delivery_option: delivery_option.toString(),
                ready_time: minReadyTime,
              });
            }}
            orientation={styles.radioLabelRow}
          />
          <RadioButton
            data={{value: '2', text: '2'}}
            valueState={order.delivery_option}
            RadioButtonWrap={styles.RadioButtonWrap}
            onChange={(delivery_option) => {
              setOrder({
                ...order,
                delivery_option: delivery_option.toString(),
              });
              handleOpenClock();
            }}>
            {order.ready_time && (
              <Text style={styles.radioLabelRow}>
                {format(order.ready_time, 'd MMMM', {locale: ru})} в{' '}
                {format(order.ready_time, 'HH:mm')}
              </Text>
            )}
          </RadioButton>
        </View>

        {timeToReadyOpen && (
          <ScrollView ref={scrollView} onLayout={handleDatepickerLayout}>
            <View style={styles.dateTimePickerWrap}>
              <DatePicker
                style={styles.dateTimePicker}
                textColor={'#ffffff'}
                date={order.ready_time}
                is24hourSource={'device'}
                mode="datetime"
                fadeToColor={colors.backgroundItem}
                locale="ru"
                minimumDate={minReadyTime}
                minuteInterval={5}
                onDateChange={(event) => {
                  if (!event) {
                    event = minReadyTime;
                  }
                  if (isBefore(event, minReadyTime)) {
                    event = minReadyTime;
                    showMessage({
                      type: 'warning',
                      message: 'Не возможно указать время меньше минимального',
                      duration: 3000,
                    });
                  }
                  setOrder({...order, ready_time: event});
                }}
              />
            </View>

            <TouchableOpacity
              style={[Buttons.buttonMain]}
              onPress={handleOpenClock}>
              <Text style={Buttons.buttonMainText}>Выбрать</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </>
    </ListItem>
  );
};

export default ReadyTimeOrder;
