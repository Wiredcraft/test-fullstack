import Mocha from 'mocha';
import {Response} from 'superagent';
import chai from 'chai';
import {expect} from 'chai';


exports.default = (): any => {
  describe('Missing', () => {
    it('POST /auth/register (missing arguments) [400]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/register`)
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

    it('POST /auth/register (missing username) [400]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/register`)
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

    it('POST /auth/register (missing password) [400]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/register`)
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
