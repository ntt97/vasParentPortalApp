import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';
import { getHeight, getWidth, getWidthAndHeight } from '@utils/dimensions';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { isIOS } from '@constants/platform';

const { width, height } = getWidthAndHeight();
const margin = width * 0.03;
const sidePadding = width * 0.05;
const topPadding = 0;
const bottomPadding = 0;
const IPHONE12_H = 844;
const IPHONE12_Max = 926;
const IPHONE12_Mini = 780;
const isIPhoneXII = (() => {
  if (!isIOS) return false;
  return (isIOS && getHeight() === IPHONE12_H) || getHeight() === IPHONE12_Max || getHeight() === IPHONE12_Mini;
})();

const nHeight = (() => {
  if (isIPhoneXII) {
    return 45;
  } else if (isIphoneX()) {
    return 30;
  } else if (isIOS) {
    return 10;
  } else {
    return 0;
  }
})();

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flatContainer: {
    backgroundColor: colors.background,
    width: '100%',
  },
  boxItem: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: fontSizes.smaller,
    color: colors.black,
    ...fontFamilies.bold,
    flex: 1,
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
    height: 80,
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: nHeight,
    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  sideLanguage: {
    backgroundColor: colors.redBold,
  },
  mainText: {
    fontSize: fontSizes.smaller - 2,
    fontWeight: 'bold',
    color: colors.mainColor,
    alignSelf: 'center',
  },
  languageContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  headerFlat: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: colors.newRed,
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  textTitleFlat: {
    color: colors.white,
    fontSize: fontSizes.titleSmall,
    fontWeight: 'bold',
  },
  listNotify: {
    flex: 1,
  },
  activities: {},
  containerActivities: {
    padding: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.redBold,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconPin: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badge: {
    width: getWidth() * 0.145,
    height: getWidth() * 0.145,
    borderRadius: (getWidth() * 0.145) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.newRed,
    marginBottom: 5,
  },
  badgeContainer: {
    alignItems: 'center',
    marginVertical: 8,
    width: (getWidth() - 55) / 3,
  },
  textIcon: {
    color: colors.mainColor,
    fontSize: fontSizes.smallest,
  },
  activeNew: {
    borderColor: colors.white,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.redBold,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  textBadge: {
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
  styleActive: { fontWeight: 'bold' },
  titleHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
