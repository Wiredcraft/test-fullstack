import Mocha from 'mocha';
import {Response} from 'superagent';
import chai from 'chai';
import {expect} from 'chai';

exports.default = (): any => {
  describe('Error', () => {
    it('POST /auth/register (username missing) [401]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/register`)
          .send({
            password: '1234',
          })
          .then((res: Response) => {
            expect(res.body.error.type).to.eql('Argument error');
            expect(res.body.error.message).to.eql(
                '"username" is required',
            );
            expect(res.status).to.eql(400);
            done();
          }).catch((err: Error) => {
            return done(err);
          });
    });

    it('POST /auth/register (both missing) [401]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/register`)
          .send({})
          .then((res: Response) => {
            expect(res.body.error.type).to.eql('Argument error');
            expect(res.body.error.message).to.eql(
                '"username" is required',
            );
            expect(res.status).to.eql(400);
            done();
          }).catch((err: Error) => {
            return done(err);
          });
    });

    it('POST /auth/register (password missing) [401]', (done: Mocha.Done) => {
      chai.request(global.expressApp).post(`/auth/register`)
          .send({
            username: 'user',
          })
          .then((res: Response) => {
            expect(res.body.error.type).to.eql('Argument error');
            expect(res.body.error.message).to.eql(
                '"password" is required',
            );
            expect(res.status).to.eql(400);
            done();
          }).catch((err: Error) => {
            return done(err);
          });
    });
  });
};
