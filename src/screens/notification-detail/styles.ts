import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  // header style
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
  content: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
  },

  itemDescription: {
    flex:1,
    padding: 10,
    ...fontFamilies.regular,
    
  },
});

export default styles;
