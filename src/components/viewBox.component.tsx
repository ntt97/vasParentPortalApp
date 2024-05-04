import React from 'react';
import { View } from 'react-native';

const ViewHorizontal = (props: any) => (
  <View {...props} style={[props.style, { flexDirection: 'row' }]}>
    {props.children}
  </View>
);

const ViewVertical = (props: any) => (
  <View {...props} style={[props.style, { flexDirection: 'column' }]}>
    {props.children}
  </View>
);

export {
  ViewHorizontal,
  ViewVertical
}