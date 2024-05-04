import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))-2;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const fontFamilies = {
  thin: {
    fontFamily: 'Roboto-Thin'
    // fontWeight: '200',
  },
  bold: {
    fontFamily: 'Roboto-Bold'
    // fontWeight: '800'
  },
  light: {
    fontFamily: 'Roboto-Light'
  },
  medium: {
    fontFamily: 'Roboto-Medium'
    // fontWeight: '700',
  },
  regular: {
    fontFamily: 'Roboto-Regular'
    // fontWeight: '300',
  }
};

const fontSizes = {
  smallest: normalize(12),
  smaller: normalize(14),
  small: normalize(17),
  title: normalize(25),
  medimum: normalize(40),
  large: normalize(50),
  hero: normalize(60),
  superHero: normalize(112),
  titleSmall:normalize(13)
};

export { fontSizes, fontFamilies };
