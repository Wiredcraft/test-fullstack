import chai, {expect} from 'chai';
import Mocha from 'mocha';
import {Response} from 'superagent';
import parameters from '../../parameters';

exports.default = (): any => {
  const randomRating: number = Math.floor(Math.random() * (1 - -1 + 1) + -1);

  it('POST /vote/:talk_id (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .post(`/vote/`)
        .send({
          talk_id: parameters.talkID,
          vote: randomRating,
        })
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          expect(res.body).to.eql(
              {
                status: 'voted',
                vote: randomRating,
                talkID: parameters.talkID,
              },
          );
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });

  it('GET /talks/:talk_id (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .get(`/talks/${parameters.talkID}`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          const expected = {
            _id: parameters.talkID,
            user: parameters.user,
            rating: randomRating,
            name: parameters.talkName,
            description: parameters.talkDescription,
          };

          delete res.body.createdAt;
          delete res.body.updatedAt;

          expect(res.body).to.eql(expected);
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });
};
