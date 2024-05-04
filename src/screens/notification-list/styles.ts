import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  // header style
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
  flatContainer: { padding: 10, backgroundColor: colors.background, width: '100%' },
  boxItem: {
    borderRadius: 5,
    backgroundColor: colors.whiteSmoke,
    marginBottom: 10,
  },
  boxHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    padding: 10,
    justifyContent: 'space-between',
  },
  itemName: {
    width: '50%',
    color: colors.redBold,
    fontSize: fontSizes.smaller,
    ...fontFamilies.regular,
  },
  itemDate: {
    width: '50%',
    textAlign: 'right',
    color: colors.labelColor,
    fontSize: fontSizes.smaller,
    ...fontFamilies.regular,
  },
  itemDescription: {
    // color: colors.labelColor,
    // fontSize: fontSizes.smaller,
    ...fontFamilies.regular,
    padding: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default styles;
