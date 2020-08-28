import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    position: 'relative',
  },
  itemImageWrap: {
    flex: 1,
    minHeight: 220,
  },
  itemImage: {
    flex: 1,
  },
  itemInner: {
    backgroundColor: '#3b2327',
    padding: 15,
  },
  itemInfo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
  },
  itemText: {
    flexShrink: 1,
    flexGrow: 1,
  },
  itemPriceWrap: {
    flexDirection: 'row',
    flex: 1,
    flexShrink: 1,
    justifyContent: 'flex-end',
  },
  itemPrice: {
    textAlign: 'right',
    flexShrink: 0,
    flexGrow: 0,
    marginLeft: 5,
  },
  itemOldPrice: {
    marginLeft: 5,
    fontWeight: 'normal',
    flexShrink: 0,
    flexGrow: 0,
    color: '#ffcc00',
    textAlign: 'right',
    textDecorationLine: 'line-through',
  },
  itemDesc: {
    color: '#b6adaf',
  },
  itemControlsWrap: {
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 10,
    alignItems: 'center',
    width: 60,
    height: 170,
    zIndex: 10,
  },
  itemContentWrap: {
    zIndex: 1,
    flex: 1,
  },
  optionCalc: {
    backgroundColor: colors.buttonMain,
    width: 35,
    height: 35,
    borderRadius: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  optionCalcImg: {
    width: 41,
    height: 41,
  },
  optionCalcText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    width: '100%',
  },
  modalWrap: {
    margin: '10%',
    padding: 0,
    width: '80%',
  },
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
  itemIconsWrap: {
    position: 'absolute',
    top: 10,
    left: 15,
    flexDirection: 'row',
  },
  itemIcons: {
    height: 30,
    width: 30,
    marginLeft: -5,
  },
});
