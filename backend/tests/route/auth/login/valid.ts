import Mocha from 'mocha';
import {Response} from 'superagent';
import chai from 'chai';
import {expect} from 'chai';
import parameters from '../../../parameters';


exports.default = (): any => {
  it('POST /auth/signin (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp).post(`/auth/login`)
        .send({
          username: parameters.user,
          password: parameters.password,
        })
        .then((res: Response) => {
          parameters.setToken(res.body.token);
          expect(res.body.token).to.not.equal(null);
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });
};
