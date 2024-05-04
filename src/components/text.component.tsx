import React from 'react';
import {
  Text as TextComponent,
} from 'react-native';
const Text = (props: any) => {
  return (
    <TextComponent
      style={{}}
      {...props}
      allowFontScaling={false}>
      {props.children}
    </TextComponent>
  );
};

export default Text;
