import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Images from '../../assets/images';
import Icons from '../../assets/icons';

import * as NavigationService from '../../Navigation/navigationService';
import {normalize} from '../../util/screen';
import ButtonImage from '../ui/ButtonImage';


const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    padding: 0,
    margin: 0,
    backgroundColor: Colors.background,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: normalize(150),
  },
  content: {},
  krab: {
    width: normalize(480),
    height: normalize(425),
    marginBottom: normalize(74),
  },
  title: {
    maxWidth: normalize(504),
    marginBottom: normalize(37),
    fontSize: normalize(50),
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    maxWidth: normalize(469),
    marginBottom: normalize(100),
    fontSize: normalize(34),
    textAlign: 'center',
    color: '#fff',
    fontWeight: '300',
    opacity: 0.8,
  },
  close: {
    position: 'absolute',
    top: normalize(36),
    right: normalize(36),
  },
  scrollview: {
    flex: 1,
  },
});

type propsTypes = {
  disableClose: boolean;
};

const AquariumPopup = (props: propsTypes): JSX.Element => {
  const {disableClose} = props;

  const [opened, setOpened] = useState(true);

  const handleAccept = () => {
    setOpened(false);
  };

  const handleMenu = () => {
    NavigationService.navigate('Home');
    setOpened(false);
  };

  return (
    <Modal isVisible={opened} style={styles.modal}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.view}>
          <View style={styles.content}>
            <Image source={Images.orderAquarium} style={styles.krab} />
            <Text style={styles.title}>
              Вы заказали позицию меню из аквариума
            </Text>

            <Text style={styles.description}>
              В ближайшее время с вами свяжется наш сотрудник для прояснения
              деталей
            </Text>
          </View>

          <ButtonImage
            onPress={handleMenu}
            image={Icons.icHomeColor}
            textButton="Вернуться в меню"
          />
        </View>
      </ScrollView>

      {!disableClose && (
        <TouchableOpacity style={styles.close} onPress={handleAccept}>
          <Image source={Icons.icClose} />
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default AquariumPopup;
