import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Text from './text.component';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '@constants/colors';

interface ButtonPrimaryProps {
  title: string;
  style?: any;
  textStyle?: any;
  onPress?: (e: any) => void;
  isShadow?: boolean;
  disabled?: boolean;
  containerStyle?: any;
}
const gradientBackground = colors.backgroundPublicTheme;
const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const { title, style = {}, textStyle = {}, onPress, isShadow = true, disabled = false, containerStyle } = props;

  const handleOnPress = (e: any) => {
    if (typeof onPress === 'function') {
      onPress(e);
    }
  };
  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7} disabled={disabled} style={containerStyle}>
      <View style={isShadow ? styles.shadowBtn : {}}>
        <LinearGradient colors={gradientBackground} style={[styles.linearGradient, style]}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowBtn: {
    shadowColor: colors.btnBrColor,
    shadowRadius: 15,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    elevation: 20,
  },
  linearGradient: {
    paddingHorizontal: 15,
    borderRadius: 20,
    height: 55,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: 'transparent',
  },
});
export default ButtonPrimary;
