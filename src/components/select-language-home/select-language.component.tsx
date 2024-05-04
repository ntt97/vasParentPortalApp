import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ViewVertical } from 'components/viewBox.component';

import styles, { pickerSelectStyles } from './styles';
import { FLAG_VN, FLAG_ENG, DOWN_ARROW_BLACK, DOWN_ARROW_WHITE } from 'assets';
import RNPickerSelect from 'react-native-picker-select';
import { RootState } from '@reducers/index';
import { useSelector, useDispatch } from 'react-redux';
// import { languageWithSaga } from '@actions/language.action';
import { getDefaultLanguage } from '@utils/helper';
import { DEFAULT_LANGUAGE_INITIAL } from '@constants/users';
import withLanguageChange from '@components/hoc-language/hoc-language';

interface SelectLanguageProps {
  emitChangeLanguage: (languageId: string) => void;
  style?: object;
  pickerStyle?: {
    inputIOS?: object;
    inputAndroid?: object;
  };
  whiteArrow?: boolean;
  currentLanguage: string;
}

const SelectLanguage = (props: SelectLanguageProps) => {
  const { style = {} } = props;

  // get list language from store
  const languageList: any = useSelector<RootState>((state: RootState) => state.language.listLanguage);

  const [languageId, setLanguage] = useState(DEFAULT_LANGUAGE_INITIAL);

  function onChangeLanguage(languageIdSelected: string) {
    if (props.emitChangeLanguage && typeof props.emitChangeLanguage === 'function') {
      props.emitChangeLanguage(languageIdSelected);
    }
    
    setLanguage(languageIdSelected);
  }

  useEffect(() => {
    async function setLanguageInitial() {
      const languageId = await getDefaultLanguage();
      setLanguage(props.currentLanguage || languageId || DEFAULT_LANGUAGE_INITIAL);
    }
    setLanguageInitial();
  }, []);

  useEffect(() => {
    setLanguage(props.currentLanguage);
  }, [props.currentLanguage]);

  function getFlag(languageId: string) {
    switch (languageId) {
      case 'vi':
        return require('../../assets/images/ic_lang_vi.png');
      case 'en':
        return require('../../assets/images/ic_lang_eng.png');
      default:
        return null;
    }
  }
  return (
    <TouchableOpacity style={[styles.containerLanguage, style]} onPress={onChangeLanguage}>
      <Image source={getFlag(languageId)} style={styles.flagLanguage} resizeMode="contain" />

    </TouchableOpacity>
  );
};

export default withLanguageChange(SelectLanguage);
