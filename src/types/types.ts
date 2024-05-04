export type PayloadAction<T extends string, P> = {
  type: T;
  payload: P;
};

export interface Menu {
  iconOn: any;
  iconOff: any;
  name: string;
}
// export interface RootState {
//   auth: any;
//   sideMenuReducer: any;
// }

export interface RegisterAction {
  email: string;
}
export interface Registration {}

export interface Authentication {}

export interface LanguageList {}

export interface TimeRecall {
  key: string;
}
