import {itemMenuInfo, optionsItem} from '../../../Types/menuListTypes';
import {Text, View} from 'react-native';
import {styles} from './ItemOptions.styles';
import RadioButton from '../../ui/RadioButton';
import React from 'react';
import {cartInfoType} from '../../../Types/cartTypes';

type PropsTypes = {
  isEdit: boolean;
  cartItems: cartInfoType[];
  item: itemMenuInfo;
  itemOptions: optionsItem[];
  setItemOptions: (itemOptions: optionsItem[]) => void;
};

const RenderItemOptionsList = (props: PropsTypes): JSX.Element => {
  const {isEdit, cartItems, item, itemOptions, setItemOptions} = props;
  const handleItemOptionChange = (index: number, value: number): void => {
    if (itemOptions) {
      const newItemOptions = [...itemOptions];
      const newItem = itemOptions.find((i) => i.id === value);
      newItem && newItemOptions.splice(index, 1, newItem);
      setItemOptions(newItemOptions);
    }
  };

  const currentItem = isEdit ? cartItems[0] : item;

  const optionsList: optionsItem[] = currentItem.options;
  return (
    <>
      {optionsList.map((data: optionsItem, index: number) => {
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
      })}
    </>
  );
};

export default RenderItemOptionsList;
