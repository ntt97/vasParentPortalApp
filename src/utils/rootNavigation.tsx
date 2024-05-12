import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

import AuthNavigator from './authNav';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';
import {HOME_SCREEN} from '@constants/index';
import MainNavigator from './mainNav';
import {getToken} from './helper';
import styles from '@components/header/styles';

StatusBar.setHidden(true);
export default function RootNavigation() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const nameScreen = useSelector<RootState>(
    (state: RootState) => state.navigation.name,
  );

  useEffect(() => {
    setLoading(true);

    if (nameScreen == HOME_SCREEN) {
      setIsLogin(true);
      setLoading(false);
    } else if (nameScreen == 'LOGOUT' || nameScreen == '') {
      init();
    }
  }, [nameScreen]);

  const init = async () => {
    const response = await getToken();
    if (response) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setLoading(false);
  };

  return (
    <NavigationContainer>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : isLogin ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
