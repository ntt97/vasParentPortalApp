import React, {useState, useEffect} from 'react';
import {Image, View, AppState, Keyboard} from 'react-native';
import {ViewVertical} from '@components/viewBox.component';
import styles from './styles';
import colors from 'constants/colors';
import * as appString from 'constants/appString';
import {fontSizes, fontFamilies} from 'constants/fonts';
import {BACK_ARROW} from 'assets';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {RootState} from 'reducers/';
import ListUserScreen from './components/list-user-screen';
import ChannelScreen from './components/channel-screen';
import Header from '@components/header/header.component';
import {strings} from '@utils/i18n';
import NavigationActionsService from '@utils/navigation';
import TabBarBottom from './tab-bar-bottom';
import {getCurrentUser} from '@utils/helper';

const MessageScreen = ({route}: any) => {
  const props = route.params;
  const [currentScreen, setCurrentScreen] = useState('channel');
  const [isShowBottom, setIsShowBottom] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyBoardDidHide,
    );

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  function keyboardDidShow() {
    setIsShowBottom(false);
  }

  function keyBoardDidHide() {
    setIsShowBottom(true);
  }

  const handleAppStateChange = async (params: any) => {
    if (params === 'background') {
      const user = await getCurrentUser();
      const id = JSON.parse(user as any).id;
      if (!id) return;
      let url = `/${appString.USERS}/${id}`;
      database().ref(url).update({
        chattingWith: '',
      });
    }
  };

  const changeContent = (props: any) => {
    setCurrentScreen(props);
  };

  const renderScreen = (param: any) => {
    switch (param) {
      case 'channel':
        return <ChannelScreen menu={props.menu} />;
      case 'list':
        return <ListUserScreen menu={props.menu} />;

      default:
        return <ChannelScreen />;
    }
  };

  return (
    <ViewVertical
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 1}}>{renderScreen(currentScreen)}</View>
      {isShowBottom ? (
        <TabBarBottom
          currentScreen={currentScreen}
          changeContent={changeContent}
        />
      ) : null}
    </ViewVertical>
  );
};

export default MessageScreen;
