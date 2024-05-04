import {put, call, takeLatest} from 'redux-saga/effects';
import * as actions from 'actions/user.action';
import {
  GET_PROFILE_USER_SAGA,
  UPDATE_USER_SAGA,
  CHANGE_PASSWORD_SAGA,
  UPLOAD_AVATAR_SAGA,
  GET_RELATIONSHIP_SAGA,
} from 'constants/index';
import NavigationActionsService from '@utils/navigation';
import BaseService from 'services/';
import {PayloadAction} from 'types/types';
import {decodeToken, getErrorMessage} from '@utils/helper';
import {strings} from 'utils/i18n';

function* getProfile(action: PayloadAction<string, actions.DefaulPayload>) {
  NavigationActionsService.showLoading();
  try {
    const {id} = action.payload;
    const data = yield call(BaseService.instance.user.getProfile, id);

    yield put(actions.saveProfileUser(data));
  } catch (err) {
    yield put(
      actions.setMessage({
        text: getErrorMessage(err, strings('msg_error')),
        type: 'ERROR',
      }),
    );
  }
  NavigationActionsService.hideLoading();
}

function* updateProfile(action: PayloadAction<string, actions.PayloadUser>) {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(
      BaseService.instance.user.updateProfile,
      action.payload,
    );
    if (response.success) {
      yield put(
        actions.setMessage({
          type: 'SUCCESS',
        }),
      );
    }
  } catch (err) {
    yield put(
      actions.setMessage({
        text: getErrorMessage(err, strings('msg_error')),
        type: 'ERROR',
      }),
    );
  }
  NavigationActionsService.hideLoading();
}

function* changePass(action: PayloadAction<string, actions.PayloadPassword>) {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(
      BaseService.instance.user.changePassword,
      action.payload,
    );
    if (response.success) {
      yield put(
        actions.setMessageChangePass({
          text: strings('changePassword_msgSuccess'),
          type: 'SUCCESS',
        }),
      );
    }
  } catch (err) {
    yield put(
      actions.setMessageChangePass({
        text: getErrorMessage(err, strings('msg_error')),
        type: 'ERROR',
      }),
    );
  }
  NavigationActionsService.hideLoading();
}

function* uploadAvatar(action: PayloadAction<string, actions.PayloadUpload>) {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(
      BaseService.instance.user.uploadAvatar,
      action.payload,
    );
    if (response && response.length > 0) {
      const avatarId = response[0].id;
      const user = yield call(decodeToken);
      const responseAvatar = yield call(
        BaseService.instance.user.updateProfile,
        {
          id: user.id,
          avatar: avatarId,
        },
      );
      if (responseAvatar.success) {
        yield put(
          actions.setMessage({
            text: strings('userProfile_msgUploadSuccess'),
            type: 'SUCCESS',
          }),
        );
      }
    }
  } catch (err) {
    yield put(
      actions.setMessage({
        text: getErrorMessage(err, strings('msg_error')),
        type: 'ERROR',
      }),
    );
  }
  NavigationActionsService.hideLoading();
}

function* getRelationship() {
  // NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.user.getRelationships);
    const tempArr = [];
    if (response && response[0] && Array.isArray(response[0].value)) {
      for (let i = 0; i < response[0].value.length; i++) {
        tempArr.push({
          value: response[0].value[i].id,
          label: response[0].value[i].name,
          languageId: response[0].value[i].languageId,
        });
      }
    }

    yield put(actions.setRelationship(tempArr));
  } catch (err) {
    yield put(
      actions.setMessage({
        text: getErrorMessage(err, strings('msg_error')),
        type: 'ERROR',
      }),
    );
  }
  // NavigationActionsService.hideLoading();
}

function* userSaga() {
  yield takeLatest(GET_PROFILE_USER_SAGA, getProfile);
  yield takeLatest(UPDATE_USER_SAGA, updateProfile);
  yield takeLatest(CHANGE_PASSWORD_SAGA, changePass);
  yield takeLatest(UPLOAD_AVATAR_SAGA, uploadAvatar);
  yield takeLatest(GET_RELATIONSHIP_SAGA, getRelationship);
}

export default userSaga;
