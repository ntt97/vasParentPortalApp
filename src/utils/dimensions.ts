import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const widthHeight = Dimensions.get('window');
export const getWidth = () => width;
export const getHeight = () => height;
export const getWidthAndHeight = () => widthHeight;
