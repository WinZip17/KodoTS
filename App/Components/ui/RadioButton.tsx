import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import StringText from './StringText/StringText';

const styles = StyleSheet.create({
  circleOuter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  circleOuterCheck: {
    borderColor: '#ffcc00',
  },
  circleInner: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ffcc00',
  },
});

type PropsTypes = {
  children?: React.ReactNode;
  data: {
    text: string | number;
    value: string | number;
  };
  valueState: string | number;
  viewStyle?: StyleProp<ViewStyle>;
  RadioButtonWrap: StyleProp<ViewStyle>;
  onChange: (val: string | number) => void;
  orientation?: any;
};

const RadioButton = (props: PropsTypes): JSX.Element => {
  const {
    data,
    valueState,
    viewStyle,
    RadioButtonWrap,
    onChange,
    orientation,
  } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onChange(data.value);
        }}>
        <View style={[RadioButtonWrap, viewStyle]}>
          <View
            style={[
              styles.circleOuter,
              data.value === valueState && styles.circleOuterCheck,
            ]}>
            {data.value === valueState && <View style={styles.circleInner} />}
          </View>
          <StringText
            style={data.text ? orientation : ''}
            text={data.text.toString()}
          />
          {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
