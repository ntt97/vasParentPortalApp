import { StyleSheet,Dimensions } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    flex:1
  },
  input:{    
      padding: 5,
      paddingLeft:10,
      fontSize: fontSizes.smallest,
      height: 32,
      marginHorizontal: 10,
      borderRadius: 8,
      backgroundColor: colors.white,
      marginVertical: 5,    

  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  item:{
    height: width*0.15+10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex:1 ,
   
    
  },
  itemContent: {
    height:"100%",
    display: 'flex',
    borderBottomWidth:1,
    justifyContent:'center',    
    borderColor:colors.gray,
    flex:1,
    marginLeft:10
   
  },
  txtName: {
    fontSize: fontSizes.smallest,
    fontWeight: 'bold',
    color: colors.black,
  },
  txtYearGroup: {
    fontSize: fontSizes.smallest,
    fontWeight: 'bold',
    color: colors.gray,
  },
 
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
});

export default styles;
