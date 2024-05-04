import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as InputComponent } from 'react-native-elements';
import colors from '@constants/colors';
import { fontSizes, fontFamilies } from '@constants/fonts';

const Input = (props: any) => {
  return (
    <InputComponent
      errorStyle={styles.errorStyle}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      labelStyle={styles.labelStyle}
      disabledInputStyle={styles.disabledInputStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  errorStyle: { color: colors.white },
  inputContainerStyle: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.placeholderTextColor,
    paddingLeft: 10,
  },
  disabledInputStyle: {
    backgroundColor: colors.whiteSmoke,
    paddingLeft: 10,
  },
  inputStyle: {
    fontSize: fontSizes.smaller,
    color: '#06313E',
  },
  labelStyle: {
    color: colors.labelColor,
    fontSize: fontSizes.smaller,
    paddingBottom: 5,
    fontWeight: 'normal',
    // ...fontFamilies.bold
  },
});

export default Input;
