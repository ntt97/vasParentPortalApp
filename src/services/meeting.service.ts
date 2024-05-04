import { RequestMethod } from '@constants/index';

import BaseService from 'services';

export default class MeetingService {
  private static baseService: BaseService;

  constructor(baseService: BaseService) {
    MeetingService.baseService = baseService;
  }

  public async getMeeting(params: any): Promise<any> {
    try {
      const response = await MeetingService.baseService.request(RequestMethod.GET, '/meetings/detail', {}, {}, params);
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getMeeting in services/meeting.service.ts',
      });
      return Promise.reject(err);
    }
  }
}
