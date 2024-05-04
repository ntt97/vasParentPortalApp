import { StyleSheet, Dimensions, Text } from 'react-native';
import colors from 'constants/colors';
import { fontSizes} from '@constants/fonts';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  item:{
    height: width*0.15+10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  
    
  },
  itemLeft: {
    width: width*0.15,
    height: width*0.15,
    borderRadius: width*0.15/2,    
    marginLeft:10,
    overflow:'hidden'
    
  },
  itemRight: {
    height:"100%",
    display: 'flex',
    flexDirection:'row',
    flex: 5,
    marginLeft: 30,
    borderBottomWidth:1,    
    justifyContent:'space-between',    
    borderColor:colors.lightRed,
    marginRight:20

  },
  txtName: {
    fontSize: fontSizes.smallest,
    fontWeight: 'bold',
    color: colors.black,
  },
  tinyLogo: {    
    width: width*0.15,
    height: width*0.15,
    borderRadius: width*0.15/2, 
  },
  textLogo:{
    backgroundColor:colors.newRed,
    display: 'flex',
    flex: 1, 
    justifyContent:"center",
    alignItems:"center",
    width: width*0.15,
    height: width*0.15,
    borderRadius: width*0.15/2,    
  },
  active: {
    borderColor:colors.white,
    borderWidth:3,
    width:15,
    height:15,
    borderRadius:10,
    backgroundColor:colors.active,
    position:"absolute",
    right:-5,
    bottom:0
  },
  txtActive:{
    color:colors.black,
    fontWeight:"bold",
    fontSize:12
  },
  activeNew: {
    borderColor:colors.white,
    borderWidth:2,
    width:20,
    height:20,
    borderRadius:10,
    backgroundColor:colors.redBold,
    justifyContent:'center',
    alignItems:'center'
   
  }
});

export default styles;
