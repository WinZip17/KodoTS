import React from 'react';
import { View, TextInput, StyleSheet, GestureResponderEvent } from 'react-native';


import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Stores/reducers';
import {sortFn} from '../../util/sortFn';
import * as Actions from '../../Stores/reducers/Actions';
import ListItem from '../ListItem';
import AutocompleteCustom from './AutocompleteCustom';
import Input from "../../Theme/Input";

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 10,
    paddingLeft: 0,
    textAlign: 'left',
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    zIndex: -1,
  },
});


type propsTypes = {
  handleAutocompleteShow: (stopScrollParent: boolean) => void;
  handleAutocompleteHide: () => void;
  hideAutocompleteResult: boolean;
};

const Address = (props: propsTypes) => {
  const {
    handleAutocompleteShow,
    handleAutocompleteHide,
    hideAutocompleteResult,
  } = props;
  const dispatch = useDispatch();

  const streets = useSelector((state: RootState) => state.streets.streets);
  const address = useSelector((state: RootState) => state.order.address);

  return (
    <ListItem style={{overflow: 'visible'}}>
      <View>
        <View>
          <AutocompleteCustom
            setAddress={(street_name: string) => {
              dispatch(Actions.saveAddresses({...address, street_name}));
            }}
            streetList={streets}
            sortFn={sortFn}
            placeholder="Улица"
            onContainerShow={handleAutocompleteShow}
            onContainerHide={handleAutocompleteHide}
            showAutocompleteResult={hideAutocompleteResult}
            value={address.street_name}
          />
        </View>
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Дом"
          style={[Input.inputMain, Input.inputWidth, styles.inputBox]}
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={address.house}
          onChangeText={(house: string) => {
            dispatch(Actions.saveAddresses({...address, house}));
          }}
        />
        <TextInput
          placeholder="Строение"
          style={[
            Input.inputMain,
            Input.inputWidth,
            Input.inputText,
            styles.inputBox,
          ]}
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={address.building}
          onChangeText={(building: string) => {
            dispatch(Actions.saveAddresses({...address, building}));
          }}
        />
        <TextInput
          placeholder="Кв. / офис"
          style={[
            Input.inputMain,
            Input.inputWidth,
            Input.inputText,
            styles.inputBox,
          ]}
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={address.flat}
          onChangeText={(flat: string) => {
            dispatch(Actions.saveAddresses({...address, flat}));
          }}
        />
      </View>
    </ListItem>
  );
};

export default Address;
