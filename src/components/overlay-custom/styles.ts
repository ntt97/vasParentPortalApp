import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontFamilies } from '@constants/fonts';

const styles = StyleSheet.create({
  centeredView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  overlayStyle: {
    borderRadius: 20,
    marginVertical: 20,
  },

  textStyle: {
    color: 'white',
    fontFamily: fontFamilies.bold.fontFamily,
    textAlign: 'center',
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 17,
    color: colors.newRed,
    lineHeight: 23,
    fontFamily: fontFamilies.bold.fontFamily,
    fontWeight: 'bold',
  },
  modalDes: {
    fontSize: 15,
    fontFamily: fontFamilies.regular.fontFamily,
    // lineHeight: 15,
    color: colors.colorMSG,
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    marginTop: 15,
  },
  textButtonLeft: {
    color: '#2CB9AA',
    fontSize: 13,
    textTransform: 'uppercase',
    lineHeight: 18,
    fontFamily: fontFamilies.bold.fontFamily,
    fontWeight: 'bold',
  },
  textButtonRight: {
    color: colors.white,
    fontSize: 13,
    textTransform: 'uppercase',
    lineHeight: 18,
    fontFamily: fontFamilies.bold.fontFamily,
    fontWeight: 'bold',
  },
});

export default styles;
