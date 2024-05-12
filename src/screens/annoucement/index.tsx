import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import Text from 'components/text.component';
import styles from './styles';
import {ViewVertical} from 'components/viewBox.component';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'reducers/';
import {
  getAllEventWithSaga,
  PayloadEventList,
  setRefreshAnnoucement,
} from '@actions/event.action';
import dayjs from 'dayjs';
import withLanguageChange from '@components/hoc-language/hoc-language';
import colors from '@constants/colors';
import {getWidth} from '@utils/dimensions';
import NavigationActionsService from '@utils/navigation';
import {NOTIFICATION_DETAIL} from 'constants/index';
import {string} from 'yup';
import {strings} from '@utils/i18n';
import Header from '@components/header/header.component';
import {fontFamilies, fontSizes} from '@constants/fonts';
import {BACK_ARROW} from '@assets/';

interface EventDetailItem {
  description: string;
  eventId: number;
  languageId: string;
  name: string;
}

interface PaginationData {
  page: number;
  limit: number;
}

interface AnnoucementProps {
  currentLanguage: string;
  componentId: any;
}

const IMAGES_MAX_WIDTH = getWidth() - 40;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  onLinkPress: (evt: any, href: any) => {
    Linking.openURL(href);
  },
  debug: false,
};

const Annoucement = (props: AnnoucementProps) => {
  const dispatch = useDispatch();
  const listEvent = useSelector<RootState>(
    (state: RootState) => state.event.listEvent,
  ) as PayloadEventList[];
  const isLoading = useSelector<RootState>(
    (state: RootState) => state.event.loading,
  );
  const pagination = useSelector<RootState>(
    (state: RootState) => state.event.pagination,
  ) as PaginationData;
  const isEndData = useSelector<RootState>(
    (state: RootState) => state.event.endData,
  ) as boolean;
  const refreshing = useSelector<RootState>(
    (state: RootState) => state.event.refreshing,
  ) as boolean;
  const current: any = useSelector<RootState>(
    (state: RootState) => state.notification.current,
  );
  const currentLanguage: any = useSelector<RootState>(
    (state: RootState) => state.language.currentLanguage,
  );

  useEffect(() => {
    if (currentLanguage) {
      dispatch(
        getAllEventWithSaga({
          pagination: {page: 1, limit: 10},
          refresh: true,
          languageId: currentLanguage,
          eventTypeId: '1',
        }),
      );
    }
  }, [currentLanguage, current]);

  function handleLoadMore() {
    if (!isEndData && !isLoading) {
      dispatch(
        getAllEventWithSaga({
          pagination: {...pagination, page: pagination.page + 1},
          languageId: currentLanguage,
          eventTypeId: '1',
        }),
      );
    }
  }

  function handleRefresh() {
    dispatch(setRefreshAnnoucement(true));
    dispatch(
      getAllEventWithSaga({
        pagination: {page: 1, limit: 10},
        refresh: true,
        languageId: currentLanguage,
        eventTypeId: '1',
      }),
    );
  }

  function renderFooter() {
    if (listEvent.length < 10 || !isLoading) {
      return null;
    }
    return (
      //Footer View with Load More button
      <ViewVertical style={styles.footer}>
        <ActivityIndicator color={colors.gray} style={{marginLeft: 8}} />
      </ViewVertical>
    );
  }
  const styleActive = {fontWeight: 'bold'};
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
        mainText={strings('announcement_sub_text')}
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

      <FlatList
        data={listEvent}
        keyExtractor={item => {
          return '' + item.id;
        }}
        style={styles.flatContainer}
        renderItem={data => {
          const eventItem = data.item;
          const eventDetail: EventDetailItem | undefined =
            eventItem.eventDetails.find(
              event => event.languageId === currentLanguage,
            );
          const eventSchools: any = eventItem.eventSchools || [];
          if (eventDetail) {
            return (
              <TouchableOpacity
                onPress={() => {
                  NavigationActionsService.push(NOTIFICATION_DETAIL, {
                    id: eventItem.id,
                  });
                }}>
                <ViewVertical
                  key={eventItem.id}
                  style={[
                    styles.boxItem,
                    eventSchools[0] && eventSchools[0].seen
                      ? ''
                      : {backgroundColor: colors.lightRed},
                  ]}>
                  <Text
                    style={[
                      styles.itemTitle,
                      eventSchools[0] && eventSchools[0].seen
                        ? ''
                        : styleActive,
                    ]}>
                    {eventDetail.name}
                  </Text>
                  <Text
                    style={[
                      styles.itemDate,
                      eventSchools[0] && eventSchools[0].seen
                        ? ''
                        : styleActive,
                    ]}>
                    {dayjs(eventItem.approvedAt).format('hh:mm  MM-DD-YYYY')}
                  </Text>
                  <Text style={{color: 'blue'}}>{strings('read_more')}</Text>
                </ViewVertical>
              </TouchableOpacity>
            );
          }
          return null;
        }}
        ListFooterComponent={renderFooter}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
    </ViewVertical>
  );
};

export default withLanguageChange(Annoucement);
