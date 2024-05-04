import { StyleSheet } from 'react-native';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  drawerIcon: { top: 8, width: 20, height: 20 },
  icon: {
    position: 'absolute',
    bottom: -3,
    right: -3
  },
  active: {
    fontSize: 14, 
    color: colors.active
  },
  inactive: {
    fontSize: 14, 
    color: colors.inactive
  },header: {
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
  // header style
  backarrow: {
    top: 7,
  },
});

export default styles;
