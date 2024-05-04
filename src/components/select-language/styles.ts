import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';

export default StyleSheet.create({
  /**
   * modal select language
   */
  containerLanguage: {},
  titleLanguage: {
    width: '100%',
    textAlign: 'center',
    fontSize: fontSizes.small,
    color: colors.redBold,
    ...fontFamilies.bold,
  },
  containerDesLaguage: {
    marginBottom: 15,
    marginTop: 15,
    color: colors.labelColor,
  },
  desLanguage: {
    width: '100%',
    textAlign: 'center',
  },
  flagLanguage: {
    position: 'absolute',
    top: '50%',
    left: 15,
    width: 22,
    height: 14,
    marginTop: -7,
  },
  containerOverlay: {
    padding: 10,
  },
  arrowDown: { width: 20, height: 20, top: '50%', right: 15 },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.placeholderTextColor,
    borderRadius: 4,
    color: colors.labelColor,
    paddingRight: 30, // to ensure the text is never behind the icon,
    paddingLeft: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.placeholderTextColor,
    borderRadius: 8,
    color: colors.labelColor,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 50,
  },
});