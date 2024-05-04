import React from 'react';
import Toast from 'react-native-tiny-toast';

import colors from 'constants/colors';
import { CANCEL, SUCCESS, ERROR } from 'assets';
import { StyleSheet } from 'react-native';
import { strings } from 'utils/i18n';

const ToastComponent = (type: string, message?: string) => {
  let msg = strings('msg_updateSuccess');
  if(type == 'ERROR') {
    msg = strings('msg_error');
  }
  return (
    Toast.show(
      message ? message : msg,
      {
        position: Toast.position.BOTTOM,
        containerStyle: styles.containerStyle,
        textStyle: styles.textStyle,
        imgSource: type == 'SUCCESS' ? SUCCESS : ERROR,
        imgStyle: {},
        mask: true,
        maskStyle: {}
      })
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 20,
    shadowColor: "#00000029",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  textStyle: {
    color: colors.labelColor,
    paddingLeft: 5,
    fontSize: 14
  }
})

export default ToastComponent;