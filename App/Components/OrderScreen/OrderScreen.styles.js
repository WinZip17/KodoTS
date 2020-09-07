import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../Theme/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  listWrap: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productDeliveryText: {
    color: '#ffcc00',
    fontSize: 12,
  },
  personCountWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  personCounter: {
    flexDirection: 'row',
  },
  textPerson: {
    fontSize: 18,
    color: Colors.whiteText,
  },
  personCalc: {
    backgroundColor: '#ffcc00',
    width: 28,
    height: 28,
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personCalcImg: {
    width: 28,
    height: 28,
    marginLeft: 11,
    marginRight: 11,
  },
  dateTimePickerWrap: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  dateTimePicker: {
    width: width,
  },
  personCalcText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
    width: '100%',
  },
  deliveryWrap: {
    padding: 15,
    paddingBottom: 25,
  },
  deliveryDesc: {
    color: Colors.whiteText,
    lineHeight: 20,
    fontSize: 14,
    marginTop: 15,
    zIndex: -10,
  },
  inputMain: {
    color: Colors.whiteText,
    borderBottomColor: '#ffcc00',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop: -5,
    fontSize: 17,
    padding: 0,
    paddingTop: 5,
    paddingBottom: 5,
    zIndex: -1,
  },
  inputArea: {
    textAlignVertical: 'top',
    color: Colors.whiteText,
    fontSize: 17,
    padding: 15,
    height: 120,
    justifyContent: 'flex-start',
  },
  marginDestroy: {
    marginTop: 0,
  },
  orderButtonWrap: {
    marginTop: 15,
    marginBottom: 15,
  },
  RadioButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabelColumn: {
    color: Colors.whiteText,
    marginLeft: 10,
    width: '100%',
    fontSize: 17,
  },
  radioLabelRow: {
    color: Colors.whiteText,
    marginLeft: 10,
    minWidth: 140,
    fontSize: 17,
  },
  radioLabelRowContactless: {
    color: Colors.whiteText,
    marginLeft: 15,
    minWidth: 140,
    fontSize: 15,
    marginBottom:10
  },
  typeDeliveryWrap: {
    flexDirection: 'row',
  },
  inputBox: {
    marginTop: 10,
  },
  inputBoxPay: {
    marginTop: -5,
    marginBottom: 15,
  },
  orderWrapper: {
    margin: 20,
    borderRadius: 4,
    padding: 20,
  },
  emailInput: {
    marginBottom: 15,
    marginTop: 0,
    marginLeft: 0,
    width: '97%',
  },
  emailErrorInput: {
    borderBottomColor: 'red',
    marginBottom: 5,
  },
  emailErrorText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    color: Colors.whiteText,
  },
});

export default styles;
