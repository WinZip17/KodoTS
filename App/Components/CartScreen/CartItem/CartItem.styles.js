import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
    flexWrap: 'wrap',
    margin: 0,
  },
  itemContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexBasis: '90%',
  },
  itemFull: {
    flexBasis: '100%',
  },
  arrowBlock: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3%',
  },
  arrow: {
    width: 8,
    height: 13,
  },
  arrowTouch: {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemName: {
    flexBasis: '80%',
  },
  itemOptions: {
    marginTop: 5,
    color: 'white',
  },
  itemOption: {
    flexDirection: 'row',
  },
  itemOptionDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffcc00',
    marginRight: 8,
    marginTop: 8,
  },
  productMissing: {
    color: '#7e575a',
  },
  aquariumText: {
    color: '#cf0202',
  },
});
