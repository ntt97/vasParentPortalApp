import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Share,
  Platform,
} from 'react-native';
import PDFView from 'react-native-view-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {BASE_URL} from 'constants/config';
import NavigationActionsService from '@utils/navigation';
import {strings} from 'utils/i18n';
import BaseService from 'services/';
// import RNFetchBlob from 'rn-fetch-blob';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {getToken} from '@utils/helper';

import {isIOS} from '@constants/platform';
import {ViewHorizontal} from '@components/viewBox.component';
import {createIconSetFromFontello} from 'react-native-vector-icons';

const PdfScreen = ({route}: any) => {
  const props = route.params;
  const [base, setBase] = useState('');
  const onError = () => {
    Alert.alert(strings('msg_headerTitle'), strings('msg_error'), [
      {
        text: 'OK',
        onPress: () => NavigationActionsService.pop(),
      },
    ]);
  };
  const getFile = async () => {
    try {
      const base = await BaseService.instance.student.getPdf({
        id: props.id,
        link: props.link,
      });
      setBase(base);
    } catch (err) {
      if (err === 406) {
        Alert.alert(
          strings('studentReport_titleTuitionWarn'),
          strings('studentReport_descriptionTuitionWarn'),
          [
            {
              text: 'OK',
              onPress: () => NavigationActionsService.pop(),
            },
          ],
        );
      } else {
        Alert.alert(strings('msg_headerTitle'), strings('msg_error'), [
          {
            text: 'OK',
            onPress: () => NavigationActionsService.pop(),
          },
        ]);
      }
    }
    // NavigationActionsService.hideLoading();
  };

  useEffect(() => {
    getFile();
  }, []);

  function makeid() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  async function hasAndroidPermission() {
    if (Number(Platform.Version) >= 33) {
      return true;
    }

    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App need this permission to access your storage',
        message: '',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function downloadReport() {
    try {
      if (base === '') {
        return false;
      }
      const token = await getToken();
      // for ios device
      let path =
        ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + `name` + '.pdf';

      if (!isIOS) {
        // have to request permistion to use useDownloadManager feature
        // for ios device
        const permissionWrite = await hasAndroidPermission();

        if (permissionWrite) {
          //  Android have save file into the DownloadDir folder
          path =
            ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + props.id + '.pdf';
        } else {
          console.log('===========================================');
          console.log('granted: ', permissionWrite);
          console.log('===========================================');
          return false;
        }
      }

      let tempLink = props.link.split('\\');
      tempLink = encodeURIComponent(tempLink.join('\\\\'));

      // NavigationActionsService.showLoading();
      const res = await ReactNativeBlobUtil.config({
        path: path,
        appendExt: 'pdf',
        // // android only options, these options be a no-op on IOS
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Download Success!',
          description: 'An pdf file.',
          mime: 'application/pdf',
          mediaScannable: true,
          path: path,
        },
      }).fetch(
        'GET',
        `${BASE_URL}/student/${props.id}/report-detail?link=${tempLink}`,
        {
          Authorization: 'Bearer ' + token,
          responseType: 'arraybuffer',
        },
      );

      let status = res.info().status;
      if (status === 200) {
        if (isIOS) {
          ReactNativeBlobUtil.ios.openDocument(res.path());
          // Share.share({ url: '11111' });
        } else {
          // useDownloadManager will be affected to this feature and on Android can not display pdf file after download success
          // user need to click on the notification to view pdf file
          // RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf');
        }
      }
      // NavigationActionsService.hideLoading();
    } catch (e) {
      // NavigationActionsService.hideLoading();
      Alert.alert(strings('msg_headerTitle'), strings('msg_error'), [
        {
          text: 'OK',
          onPress: () => NavigationActionsService.pop(),
        },
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ViewHorizontal style={styles.actionBtn}>
        <TouchableOpacity style={styles.btnDownload} onPress={downloadReport}>
          <Icon name="download" size={24} color={'#8B1D1F'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => NavigationActionsService.pop()}>
          <Icon name="close" size={24} color={'#8B1D1F'} />
        </TouchableOpacity>
      </ViewHorizontal>

      {!!base && (
        <PDFView
          fadeInDuration={250.0}
          style={{flex: 1}}
          onError={onError}
          // onLoad={() => NavigationActionsService.hideLoading()}
          // resource={`${BASE_URL}/student/${props.id}/report-detail?link=${props.link}`}
          resource={base}
          resourceType="base64"
        />
      )}
    </SafeAreaView>
  );
};

export default PdfScreen;
