import settingReducer, { SettingState } from './setting.reducer';
import studentNotificationReducer, { NotificationStudentState } from './student-notification.reducer';
import mealReducer, { MealState } from './meal.reducer';
import attendanceReducer, { AttendanceState } from './attendance.reducer';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from './auth.reducer';
import navigationReducer from './navigation.reducer';
import { NavigationState } from '@actions/navigation.action';
import studentReducer, { StudentState } from './student.reducer';
import userReducer, { UserState } from './user.reducer';
import languageReducer, { LanguageState } from './language.reducer';
import notifyReducer, { NotifyState } from './notification.reducer';
import eventReducer, { EventState } from './event.reducer';
import messageReducer, { MessageState } from './message.reducer';
import teacherReducer, { TeacherState } from './teacher.reducer';
import teacherFirebaseReducer, { TeacherFirebaseState } from './teacherFirebase.reduer';

export interface RootState {
  attendance: unknown;
  auth: AuthState;
  navigation: NavigationState;
  student: StudentState;
  user: UserState;
  language: LanguageState;
  notification: NotifyState;
  event: EventState;
  message: MessageState;
  teacher: TeacherState;
  teacherFirebase: TeacherFirebaseState;
  attendanceState: AttendanceState;
  meal: MealState;
  studentNotification: NotificationStudentState;
  setting: SettingState;
}

const rootState = {
  auth: authReducer,
  navigation: navigationReducer,
  student: studentReducer,
  user: userReducer,
  language: languageReducer,
  notification: notifyReducer,
  event: eventReducer,
  message: messageReducer,
  teacher: teacherReducer,
  teacherFirebase: teacherFirebaseReducer,
  attendance: attendanceReducer,
  meal: mealReducer,
  studentNotification: studentNotificationReducer,
  setting: settingReducer,
};
const rootReducer = combineReducers(rootState);
export default rootReducer;
