import { getRefreshToken } from '@utils/helper';
import { RequestMethod } from '@constants/index';
import { Authentication } from 'types/types';

// import { ApiClient } from './axios';
import BaseService from 'services';
import {
  PayloadRegister,
  PayloadLogin,
  PayloadVerifyRegister,
  PayloadForgotPassword,
  PayloadEnterPasswordRegister,
  PayloadVerifyForgotPassword,
  PayloadEnterPasswordForgot,
} from '@actions/auth.action';

export default class AuthService {
  private static baseService: BaseService;

  constructor(baseService: BaseService) {
    AuthService.baseService = baseService;
  }

  public async login(body: PayloadLogin): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/auth/login', {
        username: body.email,
        password: body.password,
        deviceId: body.deviceId,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/login in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async register(body: PayloadRegister): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/registration', {
        email: body.email,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/register in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async verifyCodeRegister(body: PayloadVerifyRegister): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/registration/verifyCode', {
        code: body.code,
        email: body.email,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/verifyCodeRegister in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async enterPasswordRegister(body: PayloadEnterPasswordRegister): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/registration/password', {
        email: body.email,
        registrationToken: body.registrationToken,
        password: body.password,
        rePassword: body.rePassword,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/enterPasswordRegister in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async forgotPassword(body: PayloadForgotPassword): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/forgotPassword', {
        email: body.email,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/forgotPassword in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async verifyCodeForgotPassword(body: PayloadVerifyForgotPassword): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/forgotPassword/verifyCode', {
        code: body.code,
        email: body.email,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/verifyCodeForgotPassword in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async enterPasswordForgot(body: PayloadEnterPasswordForgot): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/forgotPassword/password', {
        email: body.email,
        registrationToken: body.registrationToken,
        password: body.password,
        rePassword: body.rePassword,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/enterPasswordForgot in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async checkEmailRegister(email: string): Promise<any> {
    return AuthService.baseService.request(RequestMethod.GET, '/registration/' + email);
  }

  public async refreshToken(refreshToken: string, deviceId: string): Promise<Authentication> {
    try {
      const response = await AuthService.baseService.request(RequestMethod.POST, '/auth/refreshToken', {
        refreshToken,
        deviceId,
      });
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/refreshToken in services/auth.service.ts',
      });
      return Promise.reject(err);
    }
  }
}
