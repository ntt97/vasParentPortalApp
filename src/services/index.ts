import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './auth.service';
import LanguageService from './language.service';

import {BASE_URL, DEFAULT_TIMEOUT} from '@constants/config';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {
  RequestMethod,
  NAVIGATION_ROOT_WITH_SAGA,
  LOGIN_SCREEN,
} from '@constants/index';
import StudentService from './student.service';
import UserService from './user.service';
import NotificationService from './notification.service';
import {
  getToken,
  setToken,
  isTokenExpired,
  getRefreshToken,
  setRefreshToken,
} from '@utils/helper';
import EventService from './event.service';
import {store} from '@store/configureStore';
import TeacherService from './teacher.service';
import AttendanceService from './attendance';
import MeetingService from './meeting.service';

axios.interceptors.request.use(
  async function (config) {
    if (!config.headers.Authorization) {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(undefined, async function (error: AxiosError) {
  // token expiry
  const originalRequest = error.config;
  if (error.response && error.response.status === 401) {
    const apiLogins = [`${BASE_URL}/auth/refreshToken`];
    if (apiLogins.indexOf(error.config.url as string) > -1) {
      return Promise.reject(error);
    } else {
      const refreshToken = await getRefreshToken();
      const deviceId = await AsyncStorage.getItem('vas_fcmToken');
      return axios
        .post(`${BASE_URL}/auth/refreshToken`, {refreshToken, deviceId})
        .then(async (response: any) => {
          await setToken(response.data.accessToken);
          await setRefreshToken(response.data.refreshToken);
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        })
        .catch(error => {
          setToken('').then(() => {
            store.dispatch({
              type: NAVIGATION_ROOT_WITH_SAGA,
              payload: {name: LOGIN_SCREEN},
            });
          });
        });
    }
  }
  if (error.response) {
    return Promise.reject(error.response);
  }
  if (error.request) {
    return Promise.reject(error.request);
  }
  return Promise.reject(error.message);
});

export default class BaseService {
  private readonly authApi: AuthService;
  private readonly studentApi: StudentService;
  private readonly userApi: UserService;
  private readonly notificationApi: NotificationService;
  private readonly teacherApi: TeacherService;
  private readonly eventApi: EventService;
  private readonly languageApi: LanguageService;
  private readonly attendanceApi: AttendanceService;
  private readonly meetingApi: MeetingService;
  public static readonly instance: BaseService = new BaseService();

  public get event(): EventService {
    return this.eventApi;
  }

  public get auth(): AuthService {
    return this.authApi;
  }
  public get language(): LanguageService {
    return this.languageApi;
  }

  public get student(): StudentService {
    return this.studentApi;
  }

  public get user(): UserService {
    return this.userApi;
  }

  public get notification(): NotificationService {
    return this.notificationApi;
  }
  public get teacher(): TeacherService {
    return this.teacherApi;
  }
  public get attendance(): AttendanceService {
    return this.attendanceApi;
  }
  public get meeting(): MeetingService {
    return this.meetingApi;
  }

  constructor() {
    if (BaseService.instance) {
      throw new Error('Error: Singleton, use BaseService.instance');
    }

    this.eventApi = new EventService(this);
    this.authApi = new AuthService(this);
    this.studentApi = new StudentService(this);
    this.userApi = new UserService(this);
    this.languageApi = new LanguageService(this);
    this.notificationApi = new NotificationService(this);
    this.teacherApi = new TeacherService(this);
    this.attendanceApi = new AttendanceService(this);
    this.meetingApi = new MeetingService(this);
  }
  public readonly request = (
    method: RequestMethod,
    endpoint: string,
    body?: Object,
    optionalHeaders?: Object,
    params?: Object,
  ) => {
    var options = {
      baseURL: BASE_URL,
      endpoint: `${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...optionalHeaders,
      },
    };
    // console.info(method, endpoint, body, params);
    return axios({
      baseURL: options.baseURL,
      headers: options.headers,
      timeout: DEFAULT_TIMEOUT,
      ...optionalHeaders,
      method: options.method,
      url: options.endpoint,
      data: method == 'GET' ? undefined : body,
      params,
    });
  };
}
