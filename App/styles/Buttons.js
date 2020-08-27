import {StyleSheet} from 'react-native';

const Buttons = StyleSheet.create({
  buttonMain: {
    backgroundColor: '#ffcc00',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    opacity: 1,
  },
  buttonMainText: {
    fontSize: 15,
    color: '#000',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
  },
  buttonSecond: {
    borderWidth: 1,
    borderColor: '#ffcc00',
    borderStyle: 'solid',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  buttonSecondText: {
    fontSize: 15,
    color: '#ffcc00',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
  },
});

export default Buttons;
