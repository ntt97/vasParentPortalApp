import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flatContainer: { padding: 10, backgroundColor: colors.background, width: '100%' },
  boxItem: {
    backgroundColor: colors.whiteSmoke,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  itemTitle: {
    fontSize: fontSizes.small,
    color: colors.black,
    ...fontFamilies.bold,
  },
  itemDate: {
    color: colors.black,
    fontSize: fontSizes.smallest,
    marginBottom: 5,
    marginTop: 8,
  },
  itemDescription: {
    fontSize: fontSizes.smaller,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
  // header style
  backarrow: {
    top: 7,
  },
});

export default styles;