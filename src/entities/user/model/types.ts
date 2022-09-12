export type TUserStore = {
  data: TUserMap;
  list: string[];
  selfId?: string;
};

export type TUserMap = Record<string, TUser>;

export type TUser = {
  disableNotifications: boolean;
  dismissed: boolean;
  display: string;
  email: string;
  external: boolean;
  firstName: string;
  hasLicense: boolean;
  lastName: string;
  login: string;
  passportUid: number;
  self: string;
  trackerUid: number;
  uid: number;
  useNewFilters: boolean;
  welcomeMailSent: boolean;
};
