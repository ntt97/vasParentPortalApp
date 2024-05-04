import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
 
  backarrow: {
    top: 7,
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
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  hero: {
    padding: 1,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  heroLeft: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
  },
  heroRight: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    display: 'flex',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default styles;
