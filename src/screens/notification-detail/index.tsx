import React, {useEffect} from 'react';
import {ViewVertical} from '@components/viewBox.component';
import {Image, ScrollView, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'components/header/header.component';

import styles from './styles';
import colors from 'constants/colors';
import {fontSizes, fontFamilies} from 'constants/fonts';
import {BACK_ARROW} from 'assets';
import NavigationActionsService from '@utils/navigation';
import {RootState} from 'reducers/';
import {
  getCurrentNotify,
  setIconNotification,
  setLoadingNotify,
} from 'actions/notification.action';
import withLanguageChange from '@components/hoc-language/hoc-language';
import HTML from 'react-native-render-html';
import {getWidth} from '@utils/dimensions';
import {WebView} from 'react-native-webview';

import {
  IGNORED_TAGS,
  alterNode,
  makeTableRenderer,
} from '@native-html/table-plugin';
import {store} from '@store/configureStore';

const renderers = {
  table: makeTableRenderer({WebView}),
};
interface EventDetailItem {
  description: string;
  eventId: number;
  languageId: string;
  name: string;
}

const IMAGES_MAX_WIDTH = getWidth() - 20;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  alterNode,
  renderers: renderers,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  onLinkPress: (evt: any, href: any) => {
    Linking.openURL(href);
  },
  debug: false,
  ignoredTags: IGNORED_TAGS,
};

const NotificationDetail = ({route}: any) => {
  const props = route.params;
  const {id} = props;

  const current: any = useSelector<RootState>(
    (state: RootState) => state.notification.current,
  );
  const eventNotSeen: any = useSelector<RootState>(
    (state: RootState) => state.notification.eventNotSeen,
  );

  const currentLanguage: any = useSelector<RootState>(
    (state: RootState) => state.language.currentLanguage,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentNotify({id}));
    dispatch(setIconNotification(eventNotSeen - 1));
    setTimeout(() => {
      store.dispatch(setLoadingNotify(false));
    }, 1000);
  }, []);

  let eventDetail: EventDetailItem | undefined;
  if (current && current.eventDetails && Array.isArray(current.eventDetails)) {
    eventDetail = current.eventDetails.find(
      (event: any) => event.languageId === currentLanguage,
    );
  }

  return (
    <ViewVertical style={styles.container}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          ...fontFamilies.medium,
          fontWeight: 'bold',
        }}
        mainText={eventDetail ? eventDetail.name : ''}
        stylesHeader={styles.header}
        leftComponent={
          <Image
            resizeMode="cover"
            style={styles.backarrow}
            source={BACK_ARROW}
          />
        }
        leftAction={() => NavigationActionsService.pop()}
      />

      <ScrollView style={{flex: 1}}>
        {eventDetail && !!eventDetail.description ? (
          <ViewVertical horizontal style={styles.itemDescription}>
            <HTML
              tagsStyles={{span: {lineHeight: 25}}}
              html={eventDetail.description}
              {...DEFAULT_PROPS}
            />
          </ViewVertical>
        ) : null}
      </ScrollView>
    </ViewVertical>
  );
};

export default withLanguageChange(NotificationDetail);
