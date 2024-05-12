import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ENTER_PASSWORD_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  LOADING_PAGE,
  LOGIN_SCREEN,
  VERIFY_CODE_SCREEN,
} from 'constants/index';
import LoadingPage from 'screens/loading';
import LoginScreen from 'screens/login';
import FortgotPassword from 'screens/forgot-password';
import VerifyCode from 'screens/verify-code';
import EnterPassword from 'screens/enter-password';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          key={LOGIN_SCREEN}
          name={LOGIN_SCREEN}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          key={FORGOT_PASSWORD_SCREEN}
          name={FORGOT_PASSWORD_SCREEN}
          component={FortgotPassword}
        />
        <Stack.Screen
          options={{headerShown: false}}
          key={VERIFY_CODE_SCREEN}
          name={VERIFY_CODE_SCREEN}
          component={VerifyCode}
        />
        <Stack.Screen
          options={{headerShown: false}}
          key={ENTER_PASSWORD_SCREEN}
          name={ENTER_PASSWORD_SCREEN}
          component={EnterPassword}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', animation: 'fade'}}>
        <Stack.Screen
          name={LOADING_PAGE}
          component={LoadingPage}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AuthNavigator;
