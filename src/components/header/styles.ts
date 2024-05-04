import { StyleSheet, Dimensions } from 'react-native';

import colors from 'constants/colors';
import { fontSizes } from 'constants/fonts';

import { getHeight, getWidthAndHeight } from 'utils/dimensions';
const { width, height } = getWidthAndHeight();
const margin = width * 0.03;
const sidePadding = width * 0.05;
const topPadding = 0;
import { isIphoneX } from 'react-native-iphone-x-helper';
import { isIOS } from '@constants/platform';
const IPHONE12_H = 844;
const IPHONE12_Max = 926;
const IPHONE12_Mini = 780;

const isIPhoneXII = (() => {
  if (!isIOS) return false;
  return (isIOS && getHeight() === IPHONE12_H) || getHeight() === IPHONE12_Max || getHeight() === IPHONE12_Mini;
})();

const nHeight = (() => {
  if (isIPhoneXII) {
    return 130;
  } else if (isIphoneX()) {
    return 100;
  } else if (isIOS) {
    return 80;
  } else {
    return 60;
  }
})();

// width = 375 for IPhone X
const bottomPadding = 0;
export default StyleSheet.create({
  container: {
    width,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  containerNoShadow: {
    width,
  },
  headerContainer: {
    height: nHeight,
    marginTop: isIphoneX() ? 10 : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  headerText: {
    color: colors.black,
    fontSize: fontSizes.small,
    height: 25,
    top: 3,
    textAlign: 'center',
    width: width / 2,
  },
  secondaryHeaderText: {
    fontSize: fontSizes.smaller,
    fontWeight: 'bold',
    top: 10,
    left: 5,
    minWidth: 50,
  },
  styleTitle: {
    position: 'absolute',
    width,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    alignItems: 'center',
  },
  secondaryHeaderImage: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  cancelText: {
    color: colors.cancel,
  },
  doneText: {
    color: colors.done,
  },
  mark: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderColor: colors.white,
    backgroundColor: colors.mainColor,
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1.5,
  },
});
