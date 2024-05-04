import { StyleSheet } from 'react-native';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollView: { flex: 1, width: '100%', margin: 10 },
  form: {
    flex: 1.5,
    width: '100%',
    alignItems: 'center',
  },
  labelStyle: {
    color: colors.labelColor,
    fontSize: 14,
    paddingBottom: 5,
    fontWeight: 'normal',
  },
  buttonStyle: {
    height: 40,
    backgroundColor: colors.btnBrColor,
    borderColor: colors.white,
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  buttonTitle: {
    fontSize: 14,
    color: colors.white,
  },
  headerStudent: {
    width: '100%',
  },
  header: {
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  reportButtonStyle: {
    paddingRight:20 ,
  },
  reportButtonContainer: {
    margin: 0,
    alignItems: 'flex-start',
  },
  reportTitleStyle: {
    color: '#CF0A2C',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  datePicker: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 50,
  },
  inputContainerStyle: {
    width: '100%',
    // backgroundColor: colors.whiteSmoke,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: colors.whiteSmoke,
    // paddingLeft: 10,
    marginBottom: 10,
  },
  errorStyle: {
    color: colors.btnBrColor,
  },
  // header style
  backarrow: {
    top: 7,
  },
});

export default styles;
