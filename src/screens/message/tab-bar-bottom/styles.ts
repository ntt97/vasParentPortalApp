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
  bottom: {
    paddingBottom: 5,
    height: 55,
    display: 'flex',
    flexDirection: 'row',    
    borderColor: 'gray',
    paddingTop:10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    //its for android
    elevation: 40,
    backgroundColor:colors.white
    
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
  newMessage:{
    backgroundColor: colors.active,
    position: 'absolute',
    top: -5,
    right: -7,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  }
});

export default styles;
