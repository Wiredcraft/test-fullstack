import { UserProfileAccessToken } from 'src/modules/users/dto/UserProfile.dto';

export type JwtAuthPayload = Omit<UserProfileAccessToken, 'id'> & {
  sub: string;
};

export type JwtAuthPayloadDecoded = JwtAuthPayload & JwtDecodedDefault;

export type JwtDecodedDefault = {
  sub: string;
  iat: number;
  exp: number;
  aud: string | RegExp | (string | RegExp)[];
  iss: string | string[];
};
