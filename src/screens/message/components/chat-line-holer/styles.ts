import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
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
    width: '70%',
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginTop: 1,
    marginRight: 36,
  },

  textLogo: {
    backgroundColor: colors.newRed,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDelete: {
    position:'absolute'
  },

  leftDelete: {
    right:-10,
    bottom:0
  },
  rightDelete: {
    left:-35,
    bottom:5
  },
  icontrash:{
  
  }
});

export default styles;
