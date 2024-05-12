import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ANNOUNCEMENT,
  ATTENDANCE_SCREEN,
  BEHAVIOR_POINT_SCREEN,
  CHANGEPASS_SCREEN,
  CHAT_GROUP_SCREEN,
  CHAT_SCREEN,
  ENTER_PASSWORD_SCREEN,
  HOME_SCREEN,
  LOADING_PAGE,
  LOGIN_SCREEN,
  MEAL_SCREEN,
  MESSAGE_SCREEN,
  NOTIFICATION_DETAIL,
  NOTIFICATION_LIST,
  PARENT_MEETING,
  PDF_SCREEN,
  SEARCH_SCREEN,
  STUDENT_INFORMATION,
  STUDENT_LIST,
  STUDENT_PROFILE,
  STUDENT_REPORT,
  USER_PROFILE,
} from 'constants/index';
import LoadingPage from 'screens/loading';
import Home from 'screens/home';
import UserProfile from 'screens/user-profile';
import ChangePassScreen from 'screens/change-password';
import StudentListScreen from 'screens/student-list';
import StudentProfile from 'screens/student-profile';
import StudentReport from 'screens/student-report';
import EnterPassword from 'screens/enter-password';
import PdfScreen from 'screens/pdf';
import NoficationList from 'screens/notification-list';
import NoficationDetail from 'screens/notification-detail';
import MessageScreen from 'screens/message';
import ChatScreen from 'screens/message/components/chat-screen';
import SearchScreen from 'screens/message/components/search-screen';
import ChatGroupScreen from 'screens/message/components/chat-group-screen';
import AnnouncementScreen from 'screens/annoucement';
import StudentInformation from 'screens/student-information';
import MealScreen from 'screens/meal';
import AttendanceScreen from 'screens/attendance';
import ParentMeetingScreen from 'screens/parent-meeting';
import BehaviorPointScreen from 'screens/behavior-point';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          key={HOME_SCREEN}
          name={HOME_SCREEN}
          component={Home}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={USER_PROFILE}
          name={USER_PROFILE}
          component={UserProfile}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={CHANGEPASS_SCREEN}
          name={CHANGEPASS_SCREEN}
          component={ChangePassScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={STUDENT_LIST}
          name={STUDENT_LIST}
          component={StudentListScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={STUDENT_PROFILE}
          name={STUDENT_PROFILE}
          component={StudentProfile}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={STUDENT_REPORT}
          name={STUDENT_REPORT}
          component={StudentReport}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={ENTER_PASSWORD_SCREEN}
          name={ENTER_PASSWORD_SCREEN}
          component={EnterPassword}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={PDF_SCREEN}
          name={PDF_SCREEN}
          component={PdfScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={NOTIFICATION_LIST}
          name={NOTIFICATION_LIST}
          component={NoficationList}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={NOTIFICATION_DETAIL}
          name={NOTIFICATION_DETAIL}
          component={NoficationDetail}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={MESSAGE_SCREEN}
          name={MESSAGE_SCREEN}
          component={MessageScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={CHAT_SCREEN}
          name={CHAT_SCREEN}
          component={ChatScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={SEARCH_SCREEN}
          name={SEARCH_SCREEN}
          component={SearchScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={CHAT_GROUP_SCREEN}
          name={CHAT_GROUP_SCREEN}
          component={ChatGroupScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={ANNOUNCEMENT}
          name={ANNOUNCEMENT}
          component={AnnouncementScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={STUDENT_INFORMATION}
          name={STUDENT_INFORMATION}
          component={StudentInformation}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={MEAL_SCREEN}
          name={MEAL_SCREEN}
          component={MealScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={ATTENDANCE_SCREEN}
          name={ATTENDANCE_SCREEN}
          component={AttendanceScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={PARENT_MEETING}
          name={PARENT_MEETING}
          component={ParentMeetingScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          key={BEHAVIOR_POINT_SCREEN}
          name={BEHAVIOR_POINT_SCREEN}
          component={BehaviorPointScreen}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', animation: 'fade'}}>
        <Stack.Screen
          name={LOADING_PAGE}
          component={LoadingPage}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MainNavigator;
