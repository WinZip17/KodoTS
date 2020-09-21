import {Text, TextStyle} from 'react-native';
import React from 'react';
import styles from './StringText.styles';
import isArray from 'lodash-es/isArray';

type format =
  | 'default'
  | 'bold'
  | 'defaultHeader'
  | 'yellow'
  | 'comments'
  | 'price'
  | 'opacity'
  | 'green';

type PropsType = {
  children?: React.ReactNode;
  text?: string;
  style?: TextStyle | TextStyle[];
  format?: format | format[];
  fontSize?: 'p7' | 'p6' | 'p5' | 'p4' | 'p3' | 'p2' | 'p1';
  isUpperCase?: boolean;
};

const StringText = ({
  children,
  text,
  style,
  format = 'default',
  fontSize,
  isUpperCase = false,
}: PropsType) => {
  let useStyles: TextStyle[] = [styles.stylesDefault];

  const setStyleFormat = (stylesFormat: string) => {
    switch (stylesFormat) {
      case 'bold':
        useStyles.push(styles.stylesBold);
        break;
      case 'defaultHeader':
        useStyles.push(styles.stylesDefaultHeader);
        break;
      case 'yellow':
        useStyles.push(styles.stylesYellow);
        break;
      case 'comments':
        useStyles.push(styles.stylesComments);
        break;
      case 'green':
        useStyles.push(styles.stylesGreen);
        break;
      case 'price':
        useStyles.push(styles.stylesPrice);
        break;
      case 'opacity':
        useStyles.push(styles.stylesOpacity);
        break;
      default:
        useStyles.push(styles.stylesDefault);
    }
  };

  if (format && typeof format === 'string') {
    setStyleFormat(format);
  } else if (format && isArray(format)) {
    format.forEach((i) => {
      setStyleFormat(i);
    });
  }

  if (fontSize) {
    switch (fontSize) {
      case 'p1':
        useStyles.push(styles.p1);
        break;
      case 'p2':
        useStyles.push(styles.p2);
        break;
      case 'p3':
        useStyles.push(styles.p3);
      case 'p4':
        useStyles.push(styles.p4);
        break;
      case 'p5':
        useStyles.push(styles.p5);
        break;
      case 'p6':
        useStyles.push(styles.p6);
        break;
      case 'p7':
        useStyles.push(styles.p6);
        break;
      default:
        useStyles.push(styles.p1);
    }
  }

  if (style && !isArray(style)) {
    useStyles.push(style);
  } else if (style && isArray(style)) {
    useStyles = useStyles.concat(style);
  }

  return (
    <Text style={useStyles}>
      {text ? (isUpperCase ? text.toUpperCase() : text) : children && children}
    </Text>
  );
};

export default StringText;
