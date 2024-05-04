import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { isIOS } from 'constants/platform';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  itemContainer: {
    paddingTop: isIOS ? 25 : 10,
  },
  textStyle: {
    color: '#8B1D1F',
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 20,
  },
  picker: {
    width: '100%',
  },
  pickerContainer: {
    width: '100%',
    padding: 2,
    borderRadius: 5,
    marginBottom: 16,
  },
  pickerText: {
    width: '100%',
    fontSize: 15,
    color: '#06313E',
    textAlign: 'left',
    paddingBottom: 5,
  },
  btnClose: {
    height: '100%',
    width: 'auto',
    position: 'absolute',
    right: 0,
    paddingLeft: 15,
    paddingRight: 0,
    justifyContent: 'center',
  },
  textView: {
    color: '#087AEC',
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',
  },
  arrowDown: { width: 20, height: 20, top: '50%', right: 15 },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.placeholderTextColor,
    borderRadius: 4,
    color: colors.labelColor,
    // paddingRight: 30, // to ensure the text is never behind the icon,
    // paddingLeft: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.placeholderTextColor,
    borderRadius: 8,
    color: colors.labelColor,
    // paddingRight: 30, // to ensure the text is never behind the icon
    // paddingLeft: 50,
    width: '100%',
  },
});

export default styles;
