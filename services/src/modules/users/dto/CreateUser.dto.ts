export type GeneralCreateUserPayload = {
  name: string;
  email: string;
  passwordHash: string;
  githubId?: string;
  wechatId?: string;
  phone?: string;
};
