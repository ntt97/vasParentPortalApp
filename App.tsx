/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {reduxProvider} from '@store/configureStore';

function App(): React.JSX.Element {
  return reduxProvider(<Text style={styles.highlight}>App.tsx</Text>);
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
