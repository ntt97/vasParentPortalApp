import { StyleSheet } from 'react-native';
import colors from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionBtn: {
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    padding: 10,
  },
  btnClose: {
    backgroundColor: colors.white,
    // alignItems: 'flex-end',
    paddingTop: 5,
    paddingRight: 5,
  },
  // containerBtnDownload: {
  //   width: 100,
  //   marginTop: 0,
  // },
  btnDownload: {
    padding: 5,
    // height: 30,
    // borderWidth: 1,
    // backgroundColor: colors.btnBrColor,
    // borderColor: colors.btnBrColor,
    // borderRadius: 5,
    // paddingBottom: 12,
    // backgroundColor: colors.lightRed,
    // alignItems: 'flex-start',
    // paddingTop: 5,
    // paddingRight: 5,
    // color: '#000',
    // width: 100,
  },
});

export default styles;
