import BaseService from './index';
import {RequestMethod} from 'constants/index';
import {BASE_URL, VERSION, DEFAULT_TIMEOUT} from '@constants/config';

export default class UserService {
  private static baseService: BaseService;

  // private static parentId: string = "";

  // private user: string = `/parents/${UserService.parentId}`;
  // private changePass: string = `/parents/${UserService.parentId}/password`;

  constructor(baseService: BaseService) {
    UserService.baseService = baseService;
  }

  public async getProfile(parentId: string): Promise<any> {
    try {
      const response = await UserService.baseService.request(
        RequestMethod.GET,
        `/parents/${parentId}`,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getProfile in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async updateProfile(body: any) {
    try {
      const response = await UserService.baseService.request(
        RequestMethod.PATCH,
        `/parents/${body.id}`,
        body,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/updateProfile in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async changePassword(body: any) {
    try {
      const response = await UserService.baseService.request(
        RequestMethod.PATCH,
        `/parents/${body.id}/password`,
        body,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/changePassword in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async uploadAvatar(body: any) {
    try {
      const optionalHeaders = {
        'Content-Type': 'multipart/form-data',
      };
      const response = await UserService.baseService.request(
        RequestMethod.POST,
        '/files',
        body,
        optionalHeaders,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/uploadAvatar in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }
  public async getAvatar(id: string) {
    try {
      const optionalHeaders = {
        responseType: 'arraybuffer',
      };
      const response = await UserService.baseService.request(
        RequestMethod.GET,
        `/files/${id}`,
        {},
        optionalHeaders,
      );
      return response.request._response;
    } catch (err) {
      console.error({
        message: err,
        path: '/getAvatar in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async getRelationships() {
    try {
      const response = await UserService.baseService.request(
        RequestMethod.GET,
        `/setting/applications?key=PARENT_RELATIONSHIP`,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getRelationships in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async trackingChat(body: any) {
    // console.log('body', body)
    try {
      const response = await UserService.baseService.request(
        RequestMethod.POST,
        '/report/tracking',
        body,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/trackingChat in services/user.service.ts',
      });
      return Promise.reject(err);
    }
  }
}
