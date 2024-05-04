import { fontSizes, fontFamilies } from '@constants/fonts';
import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { getWidth } from '@utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex:1,
   
  },
  scrollView: { flex: 1, width: '100%', margin: 10 },
  form: {
    flex: 1,
  },
  labelStyle: {
    flex:2/5+0.1,
    color: colors.labelColor,
    fontSize: fontSizes.smaller,
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
    // fontWeight:'700'
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
    padding:5,
    marginHorizontal:20,
    marginBottom:20,
    borderWidth:1,
    borderColor:colors.redBold,
    flexWrap:'wrap',
    justifyContent:"space-between",
    borderRadius:5
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
    width:20,
    height:20,
    borderRadius:10,
    backgroundColor:colors.redBold,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    right:0
   
  },
  textBadge:{
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
  styleActive : { fontWeight: 'bold' }
});

export default styles;
