import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
const styles = StyleSheet.create({
  /**
   * modal select language
   */

  titleLanguage: {
    width: '100%',
    textAlign: 'center',
    fontSize: fontSizes.small,
    color: colors.redBold,
    ...fontFamilies.bold
  },
  containerDesLaguage: {
    marginBottom: 15,
    marginTop: 15,
    color: colors.labelColor
  },
  desLanguage: {
    width: '100%',
    textAlign: 'center'
  },
  flagLanguage: {
    position: 'absolute',
    top: 16,
    left: 15,
    width: 22,
    height: 14
  },
  containerOverlay: {
    padding: 10
  }
});

export default styles;
