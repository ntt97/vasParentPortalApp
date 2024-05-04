import { getWidth } from '@utils/dimensions';
import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
 
  container: {
    marginBottom:10,
    flex:1,
  },

  itemLeft: {
    width: 24,
    height: 24,
    borderRadius: 12,    
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: 10,
    position: 'absolute',
    top: 0,
    left: -2,
  },

  tinyLogo: {
    backgroundColor: colors.lightRed,
    display: 'flex',
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    width: getWidth()*0.75,
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 8,  
    marginTop: 1,
    marginRight: 36,
    paddingVertical:18,
    paddingHorizontal:18
  }
});

export default styles;
