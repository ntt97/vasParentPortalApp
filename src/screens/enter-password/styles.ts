import { StyleSheet } from 'react-native';
import colors from '@constants/colors';
import { fontSizes } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: { flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', height: '100%' },

  form: {
    flex: 5,
    width: '100%',
  },
  containerLogin: {
    padding: 10,
    borderRadius: 5,
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

  errorStyle: {
    color: colors.white,
  },

  // header style
  backarrow: {
    top: 7,
  },

  labelStyle: {
    color: colors.white,
    fontSize: fontSizes.smaller,
    paddingBottom: 5,
    fontWeight: 'normal',
  },

  errorLoginContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },

  wraperChbox: { alignItems: 'center', paddingTop: 10 },
  txtTerm: {
    color: colors.white,
    fontSize: fontSizes.smallest,
    // paddingBottom: 5,
    fontWeight: 'normal',
  },
  checkboxContainer: { backgroundColor: 'transparent', borderWidth: 0, padding: 0 },
  errorChboxContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  txtErrorChbox: {
    color: colors.white,
    fontSize: 12,
    paddingLeft: 5,
  },
  overlayStyle: { height: 'auto', marginHorizontal: 30, marginVertical: 50 },
});

export default styles;
