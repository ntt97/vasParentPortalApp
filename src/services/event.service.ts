import { RequestMethod } from '@constants/index';
import BaseService from 'services';
import { PayloadEventList, ParamsGetEvent } from '@actions/event.action';

export default class EventService {
  private static baseService: BaseService;

  constructor(baseService: BaseService) {
    EventService.baseService = baseService;
  }

  public async getAll(params: ParamsGetEvent): Promise<PayloadEventList> {
    try {
      const response = await EventService.baseService.request(
        RequestMethod.GET,
        '/events',
        {},
        {},
        {
          page: params.pagination.page,
          limit: params.pagination.limit,
          languageId: params.languageId,
          sortCol: 'createdAt',
          eventTypeId: params.eventTypeId,
        },
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getAll in services/event.service.ts',
      });
      return Promise.reject(err);
    }
  }
  public getImageConfig = async () => {
    try {
      const response = await EventService.baseService.request(
        RequestMethod.GET,
        '/setting/applications?key=IMAGE_CONFIG',
      );
      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getImageConfig in services/event.service.ts',
      });
      return Promise.reject(error);
    }
  };

  public getListMenuHome = async () => {
    try {
      const response = await EventService.baseService.request(
        RequestMethod.GET,
        '/setting/applications?key=HOME_SCREEN',
      );
      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getListMenuHome in services/event.service.ts',
      });
      return Promise.reject(error);
    }
  };

  public getListMenuStudentInformation = async () => {
    try {
      const response = await EventService.baseService.request(
        RequestMethod.GET,
        '/setting/applications?key=STUDENT_INFORMATION',
      );
      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getListMenuStudentInformation in services/event.service.ts',
      });
      return Promise.reject(error);
    }
  };

  public getConfigByKey = async (key: string) => {
    try {
      const response = await EventService.baseService.request(RequestMethod.GET, `/setting/applications?key=${key}`);
      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getConfigByKey in services/event.service.ts',
      });
      return Promise.reject(error);
    }
  };

  public async generateTokenForVas(): Promise<any> {
    try {
      const res = await EventService.baseService.request(RequestMethod.POST, '/auth/generateTokenForVas')
      return res.data
    } catch (error) {
      console.error({
        message: error,
        path: '/generateTokenForVas in services/event.service.ts',
      });
      return Promise.reject(error);
    }
  }

}
