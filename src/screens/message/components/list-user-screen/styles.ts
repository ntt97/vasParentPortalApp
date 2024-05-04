import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';


const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    flex:1
  },
  searchContainer:{
    marginTop: 15,
    marginBottom: 5,
    borderWidth:1,
    borderColor:'#BEBEBE',
    marginHorizontal:10,
    borderRadius:10, 
  },
  input:{    
    flexDirection:'row', 
    padding: 5,      
    fontSize: fontSizes.smallest,
    height: 32,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginVertical: 5,  
    alignItems:"center",
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
  drawerIcon: { top: 8, width: 20, height: 20 },
 
});

export default styles;
