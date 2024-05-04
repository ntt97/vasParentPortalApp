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
  btnSubmitStyle: {
    height: 40,
    borderWidth: 1,
    backgroundColor: colors.btnBrColor,
    borderColor: colors.btnBrColor,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
  },
  inputStyle: {
    fontSize: fontSizes.smaller,
    paddingLeft: 10,
  },

  form: {
    flex: 2.5,
    width: '100%',
  },
  containerLogin: {
    padding: 10,
    borderRadius: 5,
  },
  errorText: { color: colors.white, left: 0 },
  errorStyle: { color: colors.white },
  inputContainerStyle: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#BEBEBE',
  },
  loginTitle: {
    fontSize: fontSizes.small,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  viewTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewDes: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  desForgot: {
    color: colors.white,
    fontSize: fontSizes.smaller,
    textAlign: 'center',
  },
  underlineResend: {
    textDecorationLine: 'underline',
    ...fontFamilies.bold,
    color: colors.white,
  },

  backarrow: {
    top: 7,
  },

  containerOTP: { width: '100%', alignItems: 'center' },

  underlineStyleBase: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    color: colors.black,
    borderWidth: 0,
    borderRadius: 8,
  },
  errorLoginContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
});

export default styles;
