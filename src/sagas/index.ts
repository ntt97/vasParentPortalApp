import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import languageSaga from './language.saga';
import navigationRootSaga from './navigation.saga';
import studentSaga from './student.saga';
import userSaga from './user.saga';
import notificationSaga from './notification.saga';
import eventSaga from './event.saga';
import teacherSaga from './teacher.saga';
import settingSaga from './setting.saga';

export default function* rootSaga() {
  yield all([
    fork(navigationRootSaga),
    fork(authSaga),
    fork(languageSaga),
    fork(studentSaga),
    fork(userSaga),
    fork(notificationSaga),
    fork(eventSaga),
    fork(teacherSaga),
    fork(settingSaga),
  ]);
}
