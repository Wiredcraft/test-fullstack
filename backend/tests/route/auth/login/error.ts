
import Mocha from 'mocha';
import {Response} from 'superagent';
import chai from 'chai';
import {expect} from 'chai';

exports.default = (): any => {
  describe('Error', () => {
    it('POST /auth/login (user not exist) [401]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/login`)
          .send({
            username: 'user',
            password: '1234',
          })
          .then((res: Response) => {
            expect(res.body.error.type).to.eql('Auth error');
            expect(res.body.error.message).to.eql(
                'Problem while logging in. Are the credentials valid?',
            );
            expect(res.status).to.eql(400);
            done();
          }).catch((err: Error) => {
            return done(err);
          });
    });
  });
};
