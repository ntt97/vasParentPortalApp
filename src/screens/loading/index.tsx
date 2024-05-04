/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import styles from './styles';
import { ViewVertical } from 'components/viewBox.component';

const LoadingPage = (props: any) => {
  return (
    <ViewVertical style={styles.container}>
      <ActivityIndicator style={{ width: 100, height: 100 }} color="white" size="large" />
    </ViewVertical>
  );
};

export default LoadingPage;
