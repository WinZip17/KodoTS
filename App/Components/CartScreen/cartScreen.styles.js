import {StyleSheet} from 'react-native';
import GlobalStyles from '../../Theme/Global';
import {normalize} from '../../util/screen';
import colors from '../../Theme/colors';

export const styles = StyleSheet.create({
  productMain: {
    ...GlobalStyles.background,
    paddingTop: 10,
  },
  productMainCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productRow: {
    margin: 8,
    overflow: 'hidden',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  productTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 8,
  },
  productBasketField: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    width: 60,
    height: '100%',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  basket: {
    width: normalize(261),
    height: normalize(182),
  },
  productBasket: {
    width: 23,
    height: 23,
  },
  productTotalText: {
    color: '#fff',
    fontSize: 20,
  },
  productDiscount: {
    color: '#fff',
    fontWeight: '300',
  },
  productBuy: {
    backgroundColor: colors.buttonMain,
    textAlign: 'center',
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 12,
    textTransform: 'uppercase',
    marginTop: 10,
    overflow: 'hidden',
  },
  productBuyWrapper: {
    marginBottom: 40,
  },
  productDeliveryContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 20,
  },
  productDisable: {
    color: '#ff0000',
    marginBottom: 8,
  },
  productDeliveryText: {
    color: '#ffcc00',
    fontSize: 12,
  },
  emptyText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: 20,
    color: colors.whiteText,
    opacity: 0.6,
    position: 'relative',
  },
  emptyTextBold: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  preloaderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
