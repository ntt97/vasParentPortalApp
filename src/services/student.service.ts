import BaseService from './index';
import {RequestMethod} from 'constants/index';
import {BASE_URL} from 'constants/config';
import {strings} from '@utils/i18n';
import {getErrorMessage} from '@utils/helper';

export default class StudentService {
  private static baseService: BaseService;

  // public studentId: string = '';

  // private list: string = '/students';
  // private current: string = `/students/${this.studentId}`;
  // private reports: string = `/students/${this.studentId}/reports`;

  constructor(baseService: BaseService) {
    StudentService.baseService = baseService;
  }

  public async getlist(parentId: string): Promise<any> {
    try {
      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        `/parents/${parentId}/children`,
      );

      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getList in services/student.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async getCurrent(studentId: string) {
    try {
      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        `/student/${studentId}`,
      );

      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getCurrent in services/student.service.ts',
      });
    }
  }

  public async getReports(body: any): Promise<any> {
    try {
      const {studentId, period} = body;

      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        `/student/${studentId}/reports?period=${period}`,
      );

      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getReports in services/student.service.ts',
      });
    }
  }

  public async updateStudent(body: any): Promise<any> {
    try {
      const response = await StudentService.baseService.request(
        RequestMethod.PATCH,
        `/student/${body.studentId}`,
        body,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/updateStudent in services/student.service.ts',
      });
    }
  }

  public async getPdf(body: any) {
    try {
      const optionalHeaders = {
        responseType: 'arraybuffer',
      };
      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        `/student/${body.id}/report-detail?link=${body.link}`,
        {},
        optionalHeaders,
      );
      return response.request._response;
    } catch (err) {
      const result = err && err.status ? err.status : getErrorMessage(err);
      throw result;
    }
  }

  public async getSchoolYears(id: string): Promise<any> {
    try {
      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        `/school-years?studentId=${id}`,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getSchoolYears in services/student.service.ts',
      });
    }
  }

  public async getPeriod(id: string): Promise<any> {
    try {
      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        `/asa-periods?student_id=${id}`,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getPeriod in services/student.service.ts',
      });
    }
  }

  public async getTerms(): Promise<any> {
    try {
      const response = await StudentService.baseService.request(
        RequestMethod.GET,
        '/terms',
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getTerms in services/student.service.ts',
      });
    }
  }
}
