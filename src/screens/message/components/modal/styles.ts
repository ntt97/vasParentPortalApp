import { StyleSheet,Dimensions } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalView: {
    flex: 10 / 10,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnClose:{
    backgroundColor: '#e7eaed',
    flex: 0.6 / 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  txtClose:{ 
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 15    
  }
});

export default styles;
