import BaseService from './index';
import {RequestMethod} from 'constants/index';
import firestore from '@react-native-firebase/firestore';
import * as appString from 'constants/appString';
export default class TeacherService {
  private static baseService: BaseService;
  constructor(baseService: BaseService) {
    TeacherService.baseService = baseService;
  }
  public async overLimitMessage(
    teacherId: string,
    parentId: string,
  ): Promise<any> {
    try {
      const response = await TeacherService.baseService.request(
        RequestMethod.POST,
        `parents/overLimitMessage?teacherId=${teacherId}&parentId=${parentId}`,
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/overLimitMessage in services/teacher.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async getListTeacher(
    parentId: string,
    limit: number,
    page: number,
  ): Promise<any> {
    try {
      const response = await TeacherService.baseService.request(
        RequestMethod.GET,
        `/teacher?parentId=${parentId}`,
        {},
        {},
        {
          page: page,
          limit: limit,
        },
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getListTeacher in services/teacher.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async filterListTeacher(
    parentId: string,
    name: string,
    page: number,
    limit: number,
  ): Promise<any> {
    try {
      const response = await TeacherService.baseService.request(
        RequestMethod.GET,
        `/teacher?parentId=${parentId}&name=${name}`,
        {},
        {},
        {
          page: page,
          limit: limit,
        },
      );
      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/filterListTeacher in services/teacher.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async getTeacherById(
    parentId: string,
    teacherId: string,
  ): Promise<any> {
    try {
      const response = await TeacherService.baseService.request(
        RequestMethod.GET,
        `/teacher?parentId=${parentId}&teacherId=${teacherId}`,
      );

      return response.data;
    } catch (err) {
      console.error({
        message: err,
        path: '/getTeacherById in services/teacher.service.ts',
      });
      return Promise.reject(err);
    }
  }

  public async filterListTeacherFirebase(
    parentId: string,
    key: string,
  ): Promise<any> {
    try {
      let listMessage: object[] = [];
      const data1 = await firestore()
        .collection(appString.MESSAGES)
        .where('arrId', 'array-contains', parentId)
        .orderBy('nickNameSend')
        .startAt(key.toUpperCase())
        .endAt(`${key.toUpperCase()}\u9fff`)
        .limit(10)
        .get();

      data1.docs.forEach((data: any) => {
        if (data.data()) {
          if (data.data().idTo === parentId) {
            listMessage.push({
              ...data.data(),
              id: data.data().idSend,
              nickName: data.data().nickNameSend as any,
            });
          }
        }
      });

      const data2 = await firestore()
        .collection(appString.MESSAGES)
        .where('arrId', 'array-contains', parentId)
        .orderBy('nickNameTo')
        .startAt(key.toUpperCase())
        .endAt(`${key.toUpperCase()}\u9fff`)
        .limit(10)
        .get();
      data2.docs.forEach((data: any) => {
        if (data.data().isGroup) {
          listMessage.push({
            ...data.data(),
            id: data.data().idTo,
            nickName: data.data().nickNameTo,
          });
        } else if (data.data().idSend === parentId) {
          listMessage.push({
            ...data.data(),
            id: data.data().idTo,
            nickName: data.data().nickNameTo,
          });
        }
      });
      return listMessage;
    } catch (err) {
      console.error({
        message: err,
        path: '/filterListTeacherFirebase in services/teacher.service.ts',
      });
      return Promise.reject(err);
    }
  }
}
