import Mocha from 'mocha';
import {Response} from 'superagent';
import chai from 'chai';
import {expect} from 'chai';

exports.default = (): any => {
  it('POST /auth/register (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp).post(`/auth/register`)
        .send({
          username: 'wiredcraft',
          password: 'password',
        })
        .then((res: Response) => {
          expect(res.body.id).to.not.equal(null);
          expect(res.body.token).to.not.equal(null);
          expect(res).to.have.status(201);
          done();
        }).catch((err) => {
          return done(err);
        });
  });
};
