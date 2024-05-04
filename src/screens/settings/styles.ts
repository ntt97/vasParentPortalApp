import { StyleSheet } from 'react-native';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', alignItems: 'center' },
  buttonStyle: {
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.buttonColor,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  drawerIcon: { top: 8, width: 20, height: 20 },
  buttonContainer: { width: '95%', borderRadius: 27, top: 40 },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 30,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  iconInputStyle: { marginLeft: -2, marginRight: '5%' }
});

export default styles;
