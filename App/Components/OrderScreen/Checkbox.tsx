import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
  checkboxOuter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 50,
  },
  checkboxOuterCheck: {
    borderColor: '#ffcc00',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#ffcc00',
    borderRadius: 50,
  },
});

type propsTypes = {
  text: string;
  valueState: boolean;
  CheckboxWrap?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  orientation?: StyleProp<TextStyle>;
  onChange: (value: boolean) => void;
  children?: React.ReactNode;
};

const Checkbox = (props: propsTypes) => {
  const {
    text,
    valueState,
    viewStyle,
    CheckboxWrap,
    onChange,
    orientation,
  } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onChange(!valueState);
        }}>
        <View style={[CheckboxWrap, viewStyle]}>
          <View
            style={[
              styles.checkboxOuter,
              valueState && styles.checkboxOuterCheck,
            ]}>
            {valueState && <View style={styles.checkboxInner} />}
          </View>
          {text && <Text style={orientation}>{text}</Text>}
          {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Checkbox;
