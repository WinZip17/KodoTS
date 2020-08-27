import React from 'react';

import Modal from 'react-native-modal';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../styles/colors';

import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
  modalText: {
    textAlign: 'center',
    padding: 40,
    color: colors.whiteText,
    position: 'relative',
  },
  modalOptionsWrap: {
    borderTopColor: '#848484',
    borderStyle: 'solid',
    borderTopWidth: 2,
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
  },
  modalOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRightColor: '#848484',
    borderStyle: 'solid',
    borderRightWidth: 1,
    // width: '50%'
  },
  modalOptionMod: {
    borderLeftColor: '#848484',
    borderLeftWidth: 1,
    borderRightWidth: 0,
  },
  modalOptionText: {
    color: '#ffcc00',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalItem: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
  },
});

type PropsTypes = {
  isVisible: boolean;
  onYes: () => void;
  onDismiss: () => void;
  children: React.ReactNode;
};

const ConfirmModal = (props: PropsTypes): JSX.Element => {
  return (
    <Modal
      style={{margin: '10%', padding: 0, width: '80%'}}
      onBackdropPress={props.onDismiss}
      onSwipeComplete={props.onDismiss}
      hideModalContentWhileAnimating={true}
      coverScreen={true}
      useNativeDriver={true}
      isVisible={props.isVisible}>
      <ListItem>
        <Text style={styles.modalText}>{props.children}</Text>
        <View style={styles.modalOptionsWrap}>
          <View style={styles.modalItem}>
            <TouchableOpacity style={styles.modalOption} onPress={props.onYes}>
              <Text style={styles.modalOptionText}>Да</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalItem}>
            <TouchableOpacity
              style={[styles.modalOption, styles.modalOptionMod]}
              onPress={props.onDismiss}>
              <Text style={styles.modalOptionText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ListItem>
    </Modal>
  );
};

export default ConfirmModal;
