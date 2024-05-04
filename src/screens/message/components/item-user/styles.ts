import { StyleSheet, Dimensions, Text } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies} from '@constants/fonts';

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
    overflow: 'hidden',
    marginLeft:10
    
  },
  itemRight: {
    height:"100%",
    display: 'flex',
    flex: 5,
    marginLeft: 30,
    borderBottomWidth:0.2,
    justifyContent:'center',    
    borderColor:colors.gray,
    paddingRight:20
  },
  txtName: {
    fontSize: fontSizes.smallest,
    fontWeight: 'bold',
    color: colors.black,
  },
  tinyLogo: {    
    display: 'flex',
    flex: 1,
    backgroundColor:colors.gray
  },
  textLogo:{
    backgroundColor:colors.newRed,
    display: 'flex',
    flex: 1, 
    justifyContent:"center",
    alignItems:"center"
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
    fontWeight:"bold"
  }
});

export default styles;
