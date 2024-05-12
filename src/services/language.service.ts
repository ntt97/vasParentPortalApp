import {RequestMethod} from '@constants/index';
import {LanguageList} from 'types/types';

// import { ApiClient } from './axios';
import BaseService from 'services';

export default class LanguageService {
  private static baseService: BaseService;

  constructor(baseService: BaseService) {
    LanguageService.baseService = baseService;
  }

  public async getAll(): Promise<LanguageList> {
    try {
      const response = await LanguageService.baseService.request(
        RequestMethod.GET,
        '/languages',
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getAll in services/language.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async getDetailLanguage(languageId: string): Promise<any> {
    try {
      const response = await LanguageService.baseService.request(
        RequestMethod.GET,
        '/contents/' + languageId + '/languages',
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getDetailLanguage in services/language.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async changeLang(body: any) {
    try {
      const response = await LanguageService.baseService.request(
        RequestMethod.POST,
        '/registration/language',
        body,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/changeLang in services/language.service.ts',
      });
      return Promise.reject(err);
    }
  }
}
