import React from 'react';

import Modal from 'react-native-modal';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../../Theme/colors';

import ListItem from '../ListItem';
import { styles } from "../HomeScreen/ItemCard/ItemCard.styles";


type PropsTypes = {
  isVisible: boolean;
  onYes: () => void;
  onDismiss: () => void;
  children: React.ReactNode;
};

const ConfirmModal = (props: PropsTypes): JSX.Element => {
  return (
    <Modal
      style={styles.modalWrap}
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
