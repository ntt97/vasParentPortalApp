import BaseService from './index';
import { RequestMethod } from '@constants/index';
import { PayloadNotifyList, ParamsGetNotify, DefaulPayload, PayloadUpdateSeen } from '@actions/notification.action';

export default class NotificationService {
  private static baseService: BaseService;

  constructor(baseService: BaseService) {
    NotificationService.baseService = baseService;
  }

  public async getAll(params: ParamsGetNotify): Promise<PayloadNotifyList> {
    try {
      const response = await NotificationService.baseService.request(
        RequestMethod.GET,
        '/events',
        {},
        {},
        {
          page: params.pagination.page,
          limit: params.pagination.limit,
          languageId: params.languageId,
          sortCol: 'createdAt',
        },
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getAll in services/notification.service.ts',
      });
      return Promise.reject(err);
    }
  }
  public async getPinTop(params: any): Promise<PayloadNotifyList> {
    try {
      const response = await NotificationService.baseService.request(
        RequestMethod.GET,
        '/events',
        {},
        {},
        {
          pinOnTop: params.pinOnTop,
          limit: params.limit,
          languageId: params.languageId,
        },
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getPinTop in services/notification.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async getCurrent(body: DefaulPayload) {
    try {
      const response = await NotificationService.baseService.request(RequestMethod.GET, `/events/${body.id}`);

      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getCurrent in services/notification.service.ts',
      });
    }
  }

  public async updateSeen(body: PayloadUpdateSeen) {
    try {
      const response = await NotificationService.baseService.request(RequestMethod.POST, '/events/seen', body);

      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/updateSeen in services/notification.service.ts',
      });
    }
  }
}
