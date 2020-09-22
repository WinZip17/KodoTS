import React, {useEffect, useState} from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {streetTypes} from '../../Types/streetsTypes';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Input from '../../Theme/Input';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Stores/reducers';
import {
  handleAutocompleteHide,
  handleAutocompleteShow,
} from '../../Stores/reducers/scroll';

const styles = StyleSheet.create({
  autocompleteWrap: {
    height: 40,
    position: 'relative',
  },
  autocompleteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  autocompleteInputContainer: {
    borderWidth: 0,
    position: 'relative',
    zIndex: 1,
  },
  autocompleteInputList: {
    position: 'relative',
    bottom: -40,
    left: 10,
    margin: 0,
    marginRight: 20,
    padding: 10,
    paddingTop: 0,
    paddingLeft: 0,
    backgroundColor: '#5e3c41',
    borderWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    maxHeight: 120,
  },
  autocompleteListContainerStyle: {
    flexGrow: 1,
    padding: 0,
    top: -40,
    left: -10,
    marginRight: -20,
  },
  inputBox: {
    backgroundColor: Colors.backgroundColor,
    paddingRight: 10,
    paddingLeft: 0,
  },
});

type propsType = {
  value: string;
  sortFn: (arr: streetTypes[], query: string) => streetTypes[];
  setAddress: (street_name: string) => void;
  streetList: streetTypes[];
  placeholder: string;
};

const AutocompleteCustom = (props: propsType) => {
  const {value, sortFn, setAddress, streetList, placeholder} = props;

  const [pressed, setPressed] = useState(false);
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const AutocompleteResult = useSelector(
    (state: RootState) => state.scroll.hideAutocompleteResult,
  );

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const streets = query ? sortFn(streetList, query) : [];
  const emptyConatainer = query.length > 0 && streets && streets.length === 0;

  if (emptyConatainer) {
    streets.push({name: 'Ваш адрес находится вне зоны доставки', id: 0});
  }

  const onContainerShow = (autocompleteValue: boolean) => {
    dispatch(handleAutocompleteShow(autocompleteValue));
  };

  const onContainerHide = () => {
    dispatch(handleAutocompleteHide());
  };

  return (
    <Autocomplete
      inputContainerStyle={styles.autocompleteInputContainer}
      listStyle={styles.autocompleteInputList}
      listContainerStyle={styles.autocompleteListContainerStyle}
      data={streets}
      value={query}
      hideResults={pressed}
      renderTextInput={(props: any) => {
        return (
          <TextInput
            placeholder={placeholder}
            onChangeText={(text) => {
              if (pressed) {
                setPressed(false);
              }
              setQuery(text);
            }}
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={[
              Input.inputMain,
              styles.inputBox,
              {
                borderBottomColor:
                  emptyConatainer && !AutocompleteResult
                    ? '#ff0000'
                    : '#ffcc00',
                backgroundColor: Colors.backgroundColor,
              },
            ]}
            onFocus={() => {
              onContainerShow && onContainerShow(true);
            }}
            value={props.value}
            //ref={props.ref}
            onEndEditing={props.onEndEditing}
          />
        );
      }}
      keyExtractor={(item: streetTypes) => `key-${item.id}`}
      renderItem={({item}: {item: streetTypes}) => (
        <Text
          style={{
            fontSize: !emptyConatainer ? 17 : 14,
            color: !emptyConatainer ? '#ffffff' : '#ff0000',
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onPress={() => {
            if (!emptyConatainer) {
              onContainerHide && onContainerHide();
              setPressed(true);
              setQuery(item.name);
              setAddress && setAddress(item.name);
            }
          }}>
          {item.name}
        </Text>
      )}
      flatListProps={{
        scrollEnabled: true,
      }}
    />
  );
};

export default AutocompleteCustom;
