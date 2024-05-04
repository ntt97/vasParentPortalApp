import React, { useEffect } from 'react';
import { Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Text from '@components/text.component';
import Header from 'components/header/header.component';
import { ViewVertical, ViewHorizontal } from '@components/viewBox.component';

import styles from './styles';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
import { BACK_ARROW } from 'assets';
import NavigationActionsService from '@utils/navigation';
import { NOTIFICATION_DETAIL } from 'constants/';
import { RootState } from 'reducers/';
import { getAllNotifyWithSaga, PayloadNotifyList, setRefreshNotify } from '@actions/notification.action';
import { strings } from 'utils/i18n';
import withLanguageChange from '@components/hoc-language/hoc-language';
import dayjs from 'dayjs';
import HTML from 'react-native-render-html';
import { getWidth } from '@utils/dimensions';

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

const NotificationList = (props: AnnoucementProps) => {
  const dispatch = useDispatch();
  const listNotify: any = useSelector<RootState>((state: RootState) => state.notification.listNotify);
  const isLoading = useSelector<RootState>((state: RootState) => state.notification.loading);
  const pagination = useSelector<RootState>((state: RootState) => state.notification.pagination) as PaginationData;
  const isEndData = useSelector<RootState>((state: RootState) => state.notification.endData) as boolean;
  const refreshing = useSelector<RootState>((state: RootState) => state.notification.refreshing) as boolean;

  useEffect(() => {
    if (props.currentLanguage) {
      dispatch(
        getAllNotifyWithSaga({
          pagination: { page: 1, limit: 10 },
          refresh: true,
          languageId: props.currentLanguage,
        }),
      );
    }
  }, [props.currentLanguage]);

  function handleLoadMore() {
    if (!isEndData && !isLoading) {
      dispatch(
        getAllNotifyWithSaga({
          pagination: { ...pagination, page: pagination.page + 1 },
          languageId: props.currentLanguage,
        }),
      );
    }
  }

  function handleRefresh() {
    dispatch(setRefreshNotify(true));
    dispatch(
      getAllNotifyWithSaga({
        pagination: { page: 1, limit: 10 },
        refresh: true,
        languageId: props.currentLanguage,
      }),
    );
  }

  function renderFooter() {
    if (listNotify.length < 10 || !isLoading) {
      return null;
    }
    return (
      //Footer View with Load More button
      <ViewVertical style={styles.footer}>
        <ActivityIndicator color={colors.gray} style={{ marginLeft: 8 }} />
      </ViewVertical>
    );
  }

  const styleActive = { fontWeight: 'bold' };

  return (
    <ViewVertical style={{ backgroundColor: colors.background }}>
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
          stylesHeaderText={{
            color: colors.redBold,
            fontSize: fontSizes.small,
            ...fontFamilies.medium,
            fontWeight: 'bold',
          }}
          mainText={strings('notification_headerTitle')}
          stylesHeader={styles.header}
          leftComponent={<Image resizeMode="cover" style={styles.backarrow} source={BACK_ARROW} />}
          leftAction={() => NavigationActionsService.pop()}
        />

        <FlatList
          data={listNotify}
          keyExtractor={(item: any) => {
            return '' + item.id;
          }}
          style={styles.flatContainer}
          renderItem={data => {
            const eventItem = data.item;
            const eventDetail: EventDetailItem | undefined = eventItem.eventDetails.find(
              (event: any) => event.languageId === props.currentLanguage,
            );
            const eventSchools = eventItem.eventSchools || [];
            if (eventDetail) {
              return (
                <ViewVertical
                  key={eventItem.id}
                  style={[
                    styles.boxItem,
                    eventSchools[0] && eventSchools[0].seen ? '' : { backgroundColor: colors.lightRed },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => NavigationActionsService.push(NOTIFICATION_DETAIL, { id: eventItem.id })}
                  >
                    <ViewHorizontal style={styles.boxHeader}>
                      <Text
                        style={[styles.itemName, eventSchools[0] && eventSchools[0].seen ? '' : styleActive]}
                        numberOfLines={1}
                      >
                        {eventDetail.name}
                      </Text>
                      <Text style={[styles.itemDate, eventSchools[0] && eventSchools[0].seen ? '' : styleActive]}>
                        {dayjs(eventItem.approvedAt).format('MM/DD/YYYY')}
                      </Text>
                    </ViewHorizontal>
                    {/* <Text
                      style={[
                        styles.itemDescription,
                        // item.createdAt
                        //     ? ''
                        //     : {...fontFamilies.bold}
                      ]}
                      numberOfLines={4}
                    >
                      {eventDetail.description}
                    </Text> */}
                    {!!eventDetail.description ? (
                      <ViewVertical style={styles.itemDescription}>
                        <HTML html={eventDetail.description} imagesMaxWidth={getWidth() - 40} />
                      </ViewVertical>
                    ) : null}
                  </TouchableOpacity>
                </ViewVertical>
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
    </ViewVertical>
  );
};

export default withLanguageChange(NotificationList);
