import { StyleSheet } from 'react-native'
import colors from './colors'

const Input = StyleSheet.create({
  Placeholder: {
    color: '#564145'
  },
  inputMain: {
    display: 'flex',
    color: colors.whiteText,
    borderBottomColor: '#ffcc00',
    borderBottomWidth: 1,
    fontSize: 17,
    padding: 0,
    paddingTop: 5,
    paddingBottom: 5
  },
  inputWidth: {
    width: '27%'
  },
  inputEror: {
    borderBottomColor: '#ffff0000'
  },
  inputArea: {
    textAlignVertical: 'top',
    color: colors.whiteText,
    fontSize: 17,
    padding: 15,
    height: 120,
    justifyContent: "flex-start"
  },
  inputCover: {
    marginRight: 20,
    marginLeft: 21,
    marginBottom: 10
  },
  inputText: {
    textAlign: 'right'
  }
});

export default Input;
