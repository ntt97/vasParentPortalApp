import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts'

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
  bottom: {
    padding: 1,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor:colors.grayLight
  
  },
  bottomLeft: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  bottomRight: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  drawerIcon: { top: 8, width: 20, height: 20 },
});

export default styles;
