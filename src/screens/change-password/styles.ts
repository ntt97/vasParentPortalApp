import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { regularPadding } from 'constants/dimensions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  form: {
    flex: 1.5,
    width: '100%',
    paddingTop: 10,
  },
  labelStyle: {
    color: '#06313E',
    fontSize: 14,
    paddingBottom: 5,
    fontWeight: 'normal',
    marginTop: 16
  },
  inputContainerStyle: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    paddingLeft: 10,
  },
  errorStyle: {
    color: colors.btnBrColor
  },
  messageContainer: {
    backgroundColor: 'red',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  // header style
  backarrow: {
    top: 7
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
    elevation: 1
  }
})

export default styles;
