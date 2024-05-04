/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {logoutWithSaga} from '@actions/auth.action';
import {
  changeLanguageWithSaga,
  handleChangeLanguage,
} from '@actions/language.action';
import {selectMenuIndex} from '@actions/navigation.action';
import withLanguageChange from '@components/hoc-language/hoc-language';
import SelectLanguage from '@components/select-language/select-language.component';
import {getCurrentUser, setDefaultLanguage} from '@utils/helper';
import I18n, {strings} from '@utils/i18n';
import {IC_LOCK, IC_LOGOUT, LOGO_RED} from 'assets';
import Header from 'components/header/header.component';
import Text from 'components/text.component';
import {ViewHorizontal, ViewVertical} from 'components/viewBox.component';
import {CHANGEPASS_SCREEN, listMenu} from 'constants/';
import dayjs from 'dayjs';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'reducers';
import {Menu} from 'types/types';
import NavigationActionsService from 'utils/navigation';
import styles from './styles';

const SideMenu = (props: any) => {
  const dispatch = useDispatch();
  const selectedMenuIndex = useSelector<RootState>(
    (state: RootState) => state.navigation.selectedMenuIndex,
  );
  const user: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );
  const onChangeMenu = (index: number) => {
    NavigationActionsService.toggleDrawer(false);
    dispatch(selectMenuIndex({selectedMenuIndex: index}));
  };

  function onPressChangePassword() {
    NavigationActionsService.toggleDrawer(false);
    setTimeout(() => {
      NavigationActionsService.push(CHANGEPASS_SCREEN);
    }, 400);
  }

  async function onClickLogout() {
    const currentUser = await getCurrentUser();
    if (!JSON.parse(currentUser as any).id) return;
    database()
      .ref(`users/${JSON.parse(currentUser as any).id}`)
      .update({
        chattingWith: '',
        isOnline: 0,
        pushToken: '',
      });
    dispatch(logoutWithSaga());
  }

  function goToHome() {
    NavigationActionsService.toggleDrawer(false);
    dispatch(selectMenuIndex({selectedMenuIndex: 0}));
  }

  function onChangeLanguage(value: string) {
    I18n.defaultLocale = value;
    I18n.locale = value;
    moment.locale(value);
    dayjs.locale(value);
    setDefaultLanguage(value);
    dispatch(handleChangeLanguage(value));
    dispatch(changeLanguageWithSaga(value));
  }

  return (
    <ViewVertical style={styles.mainContainer}>
      <ViewVertical style={styles.container}>
        <Header noShadow={true} />

        <ViewVertical style={{flex: 1}}>
          <ViewVertical style={styles.logoContainer}>
            <TouchableOpacity onPress={goToHome}>
              <Image
                source={LOGO_RED}
                style={{height: 70, width: 280}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ViewVertical>
          {listMenu.map((icon: Menu, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={{width: '100%'}}
                onPress={onChangeMenu.bind(undefined, index)}>
                <ViewHorizontal
                  style={[
                    styles.block,
                    index === 0 && {marginTop: 40},
                    selectedMenuIndex === index && {
                      backgroundColor: 'rgba(255, 248, 249, 1)',
                      borderLeftWidth: 5,
                      borderLeftColor: '#CF0A2C',
                    },
                  ]}>
                  <Image
                    source={
                      selectedMenuIndex === index ? icon.iconOn : icon.iconOff
                    }
                    style={styles.icon}
                  />
                  <Text
                    style={[
                      styles.menuTitle,
                      selectedMenuIndex === index && {
                        color: '#CF0A2C',
                      },
                    ]}>
                    {strings(icon.name)}
                  </Text>
                </ViewHorizontal>
              </TouchableOpacity>
            );
          })}
        </ViewVertical>
        <ViewVertical>
          <ViewVertical>
            <SelectLanguage
              style={styles.sideLanguage}
              emitChangeLanguage={onChangeLanguage}
            />
          </ViewVertical>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={onPressChangePassword}>
            <ViewHorizontal style={[styles.block]}>
              <Image source={IC_LOCK} style={styles.icon} />
              <Text style={[styles.menuTitle]}>
                {strings('listMenu_changePassword')}
              </Text>
            </ViewHorizontal>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%'}} onPress={onClickLogout}>
            <ViewHorizontal style={[styles.block]}>
              <Image source={IC_LOGOUT} style={styles.icon} />
              <Text style={[styles.menuTitle]}>
                {strings('listMenu_logOut')}
              </Text>
            </ViewHorizontal>
          </TouchableOpacity>
        </ViewVertical>
      </ViewVertical>
    </ViewVertical>
  );
};

export default withLanguageChange(SideMenu);
