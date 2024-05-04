import BaseService from 'services';
import { RequestMethod } from 'constants/';
export default class AttendanceService {
  private static baseService: BaseService;

  constructor(baseService: BaseService) {
    AttendanceService.baseService = baseService;
  }
  public async getAttendance(body: any) {
    const { studentId, filterMonth, langId, version } = body;
    try {
      const response = await AttendanceService.baseService.request(
        RequestMethod.GET,
        `/api/${version}/Attendance/${studentId}/${filterMonth}/${langId}`,
      );
      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getAttendance in services/attendance.ts',
      });
      return Promise.reject(error);
    }
  }
  public async getMealByDay(body: any) {
    const { studentId, filterDate, version } = body;
    try {
      const response = await AttendanceService.baseService.request(
        RequestMethod.GET,
        `/api/v1/Food/${studentId}/${filterDate}`,
      );
      return response.data;
    } catch (error) {
      console.error({
        message: error,
        path: '/getMealByDay in services/attendance.ts',
      });
      return Promise.reject(error);
    }
  }
}
