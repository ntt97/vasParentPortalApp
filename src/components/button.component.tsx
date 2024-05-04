import React from 'react';
import { Button as ButtonComponent } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const Button = (props: any) => {
  return (
    <ButtonComponent
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      disabledStyle={styles.disabledStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: fontSizes.smaller,
    color: colors.white,
    ...fontFamilies.bold
  },

  buttonStyle: {
    height: 40,
    // borderWidth: 1,
    backgroundColor: colors.btnBrColor,
    // borderColor: colors.btnBrColor,
    borderRadius: 5
  },
  containerStyle: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 16
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.16,
    // shadowRadius: 2
  },
  disabledStyle: {
    backgroundColor: colors.grayLight
  }
});

export default Button;
