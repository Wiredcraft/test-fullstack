export class UserLoginResultDto {
  username: string;
  jwt: {
    accessToken: string;
    expiresIn: string;
  };
}
