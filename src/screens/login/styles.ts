import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
import { regularPadding } from 'constants/dimensions';
import { getWidth } from '@utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: { flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', height: '100%' },

  logo: {
    width: getWidth() - regularPadding * 2,
  },
  form: {
    flex: 2.5,
    width: '100%',
    paddingLeft: regularPadding,
    paddingRight: regularPadding,
  },
  containerLogin: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  errorStyle: {
    color: colors.btnBrColor,
    // color: 'blue'
  },

  loginTitle: {
    fontSize: fontSizes.small,
    color: colors.redBold,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  viewTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    textDecorationLine: 'underline',
    color: colors.redBold,
    fontSize: fontSizes.smaller,
    ...fontFamilies.bold,
  },
  buttonFooterStyle: {
    backgroundColor: 'transparent',
  },
  btnFooterContainer: {
    padding: 5,
    marginTop: 10,
  },
  errorLoginContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },

  containerLanguage: {
    alignItems: 'center',
    marginBottom: 20,
  },

  sideLanguage: {
    backgroundColor: colors.mainColor,
    marginLeft: 20,
    marginRight: 20,
    width: 200,
    borderWidth: 0,
    borderRadius: 8,
  },

  pickerStyleInputIOS: {
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: colors.white,
  },
  pickerStyleInputAndroid: {
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 6,
    color: colors.white,
  },
});

export default styles;
