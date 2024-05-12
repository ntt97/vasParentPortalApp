/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  CHANGE_LANGUAGE,
  HOME_SCREEN,
  LANGUAGE_WITH_SAGA_SUCCESS,
  NAVIGATION_ROOT_WITH_SAGA,
} from '@constants/index';
import {DEFAULT_LANGUAGE_INITIAL} from '@constants/users';
import {store} from '@store/configureStore';
import {getDefaultLanguage} from '@utils/helper';
import I18n from '@utils/i18n';
import RootNavigation from '@utils/rootNavigation';
import dayjs from 'dayjs';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import BaseService from 'services';

function App(): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLocaleLanguage();
  }, []);

  async function setLocaleLanguage() {
    setLoading(true);
    // get default locale from AsyncStorage
    const defaultKeyLanguage = await getDefaultLanguage();
    const value = defaultKeyLanguage || DEFAULT_LANGUAGE_INITIAL;

    // config i18n for dayjs
    dayjs.locale(value);
    moment.locale(value);
    I18n.defaultLocale = value;
    I18n.locale = value;
    store.dispatch({
      type: CHANGE_LANGUAGE,
      payload: value,
    });

    const languageList = await BaseService.instance.language.getAll();

    const detailLanguageAll = await getDetailAllLanguage(languageList);
    const translations = {};

    if (Array.isArray(languageList)) {
      const result = [];
      for (let i = 0; i < languageList.length; i++) {
        translations[languageList[i].id] = detailLanguageAll[i];

        if (languageList[i].status) {
          result.push({
            value: languageList[i].id,
            label: languageList[i].name,
          });
        }
      }

      store.dispatch({
        type: LANGUAGE_WITH_SAGA_SUCCESS,
        payload: result,
      });
    }

    I18n.translations = translations;
    setLoading(false);
  }

  return (
    <Provider store={store}>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <RootNavigation />
      )}
    </Provider>
  );
}

async function getDetailAllLanguage(languageList: any) {
  const promises = languageList.map(async language => {
    return await BaseService.instance.language.getDetailLanguage(language.id);
  });
  return await Promise.all(promises);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
