import { Dimensions, Platform, StyleSheet } from 'react-native';
import Colors from '../../../Theme/colors';
import {normalize} from '../../../util/screen';

const windowHeight = Dimensions.get('window').height;
const isIos = Platform.OS === 'ios';

export const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
  modalWrap: {
    backgroundColor: Colors.backgroundItem,
    width: '100%',
    height: windowHeight - normalize(250),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    overflow: 'hidden',
  },
  modalContainer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  modalImg: {
    height: 250,
    marginBottom: 20,
  },
  modalImgWrap: {
    position: 'relative',
  },
  modalInfo: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  radioLabelColumn: {
    color: Colors.whiteText,
    marginLeft: 10,
    flex: 1,
    fontSize: 17,
  },
  RadioButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    zIndex: 1000000,
  },
  optionTitle: {
    color: Colors.whiteText,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
  optionsTitle: {
    color: Colors.whiteText,
    textTransform: 'uppercase',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  optionCounter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
    color: Colors.whiteText,
  },
  textBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    marginLeft: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descWrap: {
    display: 'flex',
    paddingTop: 20,
  },
  desc: {
    color: '#ffffff',
    opacity: 0.4,
  },
  optionCalc: {
    backgroundColor: '#ffcc00',
    width: 28,
    height: 28,
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCalcImg: {
    width: 28,
    height: 28,
    marginLeft: 11,
    marginRight: 11,
  },
  optionCalcText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
    width: '100%',
  },
  buttonModal: {
    marginTop: 25,
    marginBottom: 25,
  },
  buttonWrap: {
    borderTopColor: '#563712',
    borderStyle: 'solid',
    borderTopWidth: isIos ? 1 : 0,
  },
  bottomSheetHeader: {
    width: '100%',
    alignItems: 'center',
    padding: normalize(20),
    zIndex: 10000,
  },
  bottomSheetPanelHandle: {
    width: normalize(94),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: '#ffffff',
  },
});
