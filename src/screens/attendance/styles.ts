import { fontSizes, fontFamilies } from '@constants/fonts';
import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { getWidth } from '@utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex:1,
   backgroundColor:colors.white
  },
  scrollView: { flex: 1, width: '100%', margin: 10 },
  form: {
    flex: 1,
  },
  labelStyle: {
    flex:2/5,
    color: colors.labelColor,
    fontSize: 14,
    paddingBottom: 5,
    fontWeight: 'normal',
  },
  buttonStyle: {
    height: 40,
    backgroundColor: colors.btnBrColor,
    borderColor: colors.white,
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  buttonTitle: {
    fontSize: 14,
    color: colors.white,
  },
  headerStudent: {
    width: '100%',
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
  reportButtonStyle: {
    padding: 0,
  },
  reportButtonContainer: {
    margin: 0,
    alignItems: 'flex-start',
  },
  reportTitleStyle: {
    color: '#CF0A2C',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  datePicker: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 50,
  },
  inputContainerStyle: {
    flex:3/5,
    borderRadius: 5,
    marginBottom: 12,
    color:'#8B1D1F',
    fontSize:fontSizes.smaller,
    fontWeight:'700'
  },
  errorStyle: {
    color: colors.btnBrColor,
  },
  // header style
  backarrow: {
    top: 7,
  },
  link:{
    color:'#0818F2',
    textDecorationLine:'underline',
    fontSize:fontSizes.smaller,
  
  },
  containerActivities:{
    // borderWidth:1,
    // borderColor:colors.gray,
    justifyContent:"space-between",
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    flex:1,
    
  },
  iconPin:{
    width:30,
    justifyContent:"center",
    alignItems:'center',
    marginRight:10
  },
  badge:{
    width:getWidth()*0.145,
    height:getWidth()*0.145,
    borderRadius:(getWidth()*0.145)/2,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colors.newRed,
    marginBottom:5
   
  },
  badgeContainer:{
    alignItems:'center',
    marginVertical:8,
    width:(getWidth()-55)/3
  },
  textIcon:{
    color:colors.mainColor,
    fontSize:fontSizes.smallest
  },
  activeNew: {
    borderColor:colors.white,
    borderWidth:2,
    width:25,
    height:25,
    borderRadius:13,
    backgroundColor:colors.redBold,
    justifyContent:'center',
    alignItems:'center',
    marginRight:9
  },
  textBadge:{
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold'
  },
 
  headerFlat:{
    flex:1,
    backgroundColor:"#BEBEBE",
    paddingVertical:12,
    // borderTopLeftRadius:15,
    // borderTopRightRadius:15,
    marginTop:5,
    paddingLeft:12

},
headerFlatCalendar:{
  justifyContent:"space-between",
  alignItems:'center',
  backgroundColor:colors.newRed,
  // paddingVertical:12,
  // paddingHorizontal:20,
},
textTitleFlat:{
  color:"#06313E",
  fontSize:fontSizes.titleSmall,
  fontWeight:'bold',
},
listNotify:{
  flex:1
},
activities:{
 
},
blockBreackfast:{
  flex:1
},
blockLunch:{
  flex:1
},
blockAfternoonSnack:{
  flex:1
},
blockNotes:{
  flex:1,
  marginBottom:50
},
blockDay:{
  flex:1
},
txtVi:{
  fontSize:fontSizes.smaller,
  lineHeight:17,
  color:"#8B1D1F",
  paddingVertical:3
},
txtEn:{
  fontSize:fontSizes.smaller,
  lineHeight:17,
  color:"#06313E"
},
containerItem:{
  flex: 1, alignItems: 'center',
  paddingVertical:8
},
txtNote:{
  color:'#06313E',
  fontSize:fontSizes.smaller,
  lineHeight:18
},
itemDay:{
  backgroundColor:colors.white,
  // width:(getWidth()-80-60)/7,
  // height:(getWidth()-80-60)/7,
  // borderRadius:((getWidth()-80-60)/7)/2,
  height:40,

},
txtDay:{
  fontSize:fontSizes.smaller,
  color:'#06313E'
},
item:{
   width:(getWidth()-40)/3,
   borderWidth:0.5,
   borderColor:colors.gray,
   justifyContent:'center',
   alignItems:'center',
},
txtBlue:{
fontSize:fontSizes.smallest,
fontWeight:'bold',
// lineHeight:13,
// color:'#2517EE',
textAlign:'center'

},
txtGreen:{
  fontSize:fontSizes.smallest,
  fontWeight:'bold',
  // lineHeight:13,
  // color:'#7BE495',
  textAlign:'center'
},
txtRed:{
  fontSize:fontSizes.smallest,
  fontWeight:'bold',
  // lineHeight:13,
  color:'#8B1D1F'
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0,0,0,0.4)',
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 13,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  width:getWidth()-80,
 

},
headerModal:{
  justifyContent:"space-between"
},
openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  alignSelf:'center',
  fontSize:fontSizes.small,
  color:'#205072'
},
modalTextDesc: {
  marginBottom: 15,
  textAlign: "center",
  alignSelf:'center',
  fontSize:fontSizes.small,
  color:'#205072',
  padding:22
},
txtDesc:{
  fontSize:fontSizes.smaller+1,
  color:'#06313E',
  lineHeight:18
}


});

export default styles;
