import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { regularPadding } from 'constants/dimensions';
import { fontSizes } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  drawerIcon: { top: 8, width: 20, height: 20 },
  scrollView: { flex: 1, width: '100%' },
  contentContainer: { alignItems: 'center', flexGrow: 1 },
  textStyle: {
    color: '#8B1D1F',
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  form: {
    flex: 1.5,
    width: '100%',
  },
  containerStyle: {
    marginTop: 10,
  },
  inputContainerStyle: {
    // backgroundColor: colors.whiteSmoke,
    width: '100%',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: colors.whiteSmoke,
    // paddingLeft: 10,
    marginBottom: 10,
  },
  inputStyle: {
    color: '#06313E',
    fontSize: 14,
  },
  labelStyle: {
    color: '#06313E',
    fontSize: 14,
    paddingBottom: 5,
    fontWeight: 'normal',
  },
  avatarContainer: {
    margin: 16,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: -4,
    bottom: -2,
  },
  errorStyle: {
    color: colors.btnBrColor,
  },
  inputIOS: {
    fontSize: fontSizes.smaller,
    borderRadius: 4,
    // paddingRight: 30, // to ensure the text is never behind the icon,
    // paddingLeft: 50,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: colors.whiteSmoke,
  },
  inputAndroid: {
    fontSize: fontSizes.smaller,
    paddingVertical: 8,
    paddingHorizontal: 6,
    // borderColor: colors.placeholderTextColor,
    borderRadius: 5,
    // paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.whiteSmoke,
  },
  pickerContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
  },
  pickerDisable: {
    backgroundColor: '#f8f8f8',
  },
  errorSelectStyle: {
    color: colors.btnBrColor,
    fontSize: 12,
  },
  header: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  link: {
    color: '#0818F2',
    textDecorationLine: 'underline',
    fontSize: fontSizes.smaller,
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});

export default styles;
