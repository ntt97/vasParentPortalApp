import BaseService from '.';
// import { RegisterAction, Registration } from ;
// import { RequestMethod } from '../constants/action-names';
import { RegisterAction, Registration } from 'types/types';
import { RequestMethod } from '@constants/index';

export default class RegisterService {
  private baseService: BaseService;
  constructor(baseService: BaseService) {
    this.baseService = baseService;
  }

  public async signUp(body: RegisterAction): Promise<Registration> {
    try {
      const response: Registration = await this.baseService.request(RequestMethod.POST, '/users', {
        email: body.email,
      });

      return response;
    } catch (err) {
      console.error({
        message: err,
        path: '/signUp in services/register.service.ts',
      });
      return Promise.reject(err);
    }
  }
}
