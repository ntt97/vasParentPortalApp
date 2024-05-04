import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes } from 'constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: { flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', height: '100%' },

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
    textAlign: 'center',
  },
  desForgot: {
    color: colors.white,
    fontSize: fontSizes.smaller,
    textAlign: 'center',
  },

  errorLoginContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },

  // header style
  backarrow: {
    top: 7,
  },
});

export default styles;
