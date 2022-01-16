import Mocha from 'mocha';
import {Response} from 'superagent';
import chai from 'chai';
import {expect} from 'chai';

exports.default = (): any => {
  describe('Missing', () => {
    it('POST /auth/login (missing arguments) [400]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/login`)
          .then((res: Response) => {
            expect(res.body.error.message).to.eql(
                '"username" is required',
            );
            expect(res).to.have.status(400);
            done();
          }).catch((err) => {
            return done(err);
          });
    });

    it('POST /auth/login (missing username) [400]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/login`)
          .send({
            password: 'admin',
          })
          .then((res: Response) => {
            expect(res.body.error.message).to.eql(
                '"username" is required',
            );
            expect(res).to.have.status(400);
            done();
          }).catch((err) => {
            return done(err);
          });
    });

    it('POST /auth/login (missing password) [400]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/login`)
          .send({
            username: 'user',
          })
          .then((res: Response) => {
            expect(res.body.error.message).to.eql(
                '"password" is required',
            );
            expect(res).to.have.status(400);
            done();
          }).catch((err) => {
            return done(err);
          });
    });
  });
};
