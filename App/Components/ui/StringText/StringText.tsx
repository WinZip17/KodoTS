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
  | 'green';

type PropsType = {
  text: string;
  style?: TextStyle;
  format?: format | format[];
  fontSize?: 'p4' | 'p3' | 'p2' | 'p1';
  isUpperCase?: boolean;
};

const StringText = ({
  text,
  style,
  format = 'default',
  fontSize,
  isUpperCase = false,
}: PropsType) => {
  const useStyles: TextStyle[] = [styles.stylesDefault];

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
      default:
        useStyles.push(styles.p1);
    }
  }

  if (style) {
    useStyles.push(style);
  }

  return (
    <Text style={useStyles}>{isUpperCase ? text.toUpperCase() : text}</Text>
  );
};

export default StringText;
