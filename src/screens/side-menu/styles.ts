import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { isIOS } from 'constants/platform';
import { fontSizes, fontFamilies } from 'constants/fonts';
const styles = StyleSheet.create({
  mainContainer: { flex: 1, width: '100%', backgroundColor: colors.background },
  container: {
    flex: 1,
    width: '100%',
  },
  logoContainer: { alignItems: 'center' },
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  icon: { width: 25, height: 25, marginRight: 20 },
  menuTitle: {
    color: colors.labelColor,
    fontSize: fontSizes.smaller,
    ...fontFamilies.regular,
  },
  sideLanguage: {
    backgroundColor: '#F2F2F2',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default styles;
