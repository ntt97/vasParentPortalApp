/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Overlay} from 'react-native-elements';
import Button from 'components/button.component';
import styles from './styles';
import {ViewVertical} from 'components/viewBox.component';
import Text from '@components/text.component';
import SelectLanguage from '@components/select-language/select-language.component';
import {getDefaultLanguage, setDefaultLanguage} from '@utils/helper';
import I18n from '@utils/i18n';
import {handleChangeLanguage} from '@actions/language.action';
import {useDispatch} from 'react-redux';
import {DEFAULT_LANGUAGE_INITIAL} from '@constants/users';

interface OverlayLanguageProps {}

const OverlayLanguage = (props: OverlayLanguageProps) => {
  const [overlayLanguage, setOverlayLanguage] = useState(false);
  const [currentSelected, setCurrentSelected] = useState('');
  const dispatch = useDispatch();
  /**
   * get default language from AsyncStorage
   */

  useEffect(() => {
    getDefaultLanguage()
      .then(language => {
        if (!language) {
          setOverlayLanguage(true);
        }
      })
      .catch(() => {
        setOverlayLanguage(true);
      });
  }, []);

  function submitLanguage() {
    const languageId = currentSelected || DEFAULT_LANGUAGE_INITIAL;
    setOverlayLanguage(false);
    I18n.defaultLocale = languageId;
    I18n.locale = languageId;
    setDefaultLanguage(languageId);
    dispatch(handleChangeLanguage(languageId));
  }

  function emitChangeLanguage(languageId: string) {
    setCurrentSelected(languageId);
  }

  return (
    <Overlay isVisible={overlayLanguage} overlayStyle={{width: '80%'}}>
      <ViewVertical style={styles.containerOverlay}>
        <Text style={styles.titleLanguage}>Select language</Text>
        <View style={styles.containerDesLaguage}>
          <Text style={styles.desLanguage}>
            Please select a language that you prefer to display on the
            application.
          </Text>
        </View>
        <SelectLanguage emitChangeLanguage={emitChangeLanguage} />

        <Button
          containerStyle={{
            width: '100%',
            marginTop: 16,
          }}
          title="Continue"
          onPress={submitLanguage}
        />
      </ViewVertical>
    </Overlay>
  );
};

export default OverlayLanguage;
