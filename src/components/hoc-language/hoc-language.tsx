import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@reducers/index';

const withLanguageChange = (WrappedComponent: any) => (props: any) => {
  const currentLanguage = useSelector<RootState>((state: RootState) => state.language.currentLanguage);

  return <WrappedComponent currentLanguage={currentLanguage} {...props} />;
};

export default withLanguageChange;
