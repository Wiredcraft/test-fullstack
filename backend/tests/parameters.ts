/* eslint-disable require-jsdoc */

import AuthService from '../src/services/auth';
import TalksService from '../src/services/talks';

class Parameters {
  authService: AuthService = new AuthService();
  talksService: TalksService = new TalksService();
  user: string;
  password: string;
  talkName: string;
  talkDescription: string;
  talkID: string;
  token: string;

  constructor() {
    this.user = 'test_user';
    this.password = 'test_password';
    this.talkName = 'Future';
    this.talkDescription = 'Talk about an upcoming future.';
    this.talkID = '';
    this.token = '';
  }

  public setToken(token: string): void {
    this.token = token;
  }
}

const parameters = new Parameters();

export default parameters;
