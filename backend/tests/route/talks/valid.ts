import chai, {expect} from 'chai';
import Mocha from 'mocha';
import {Response} from 'superagent';
import parameters from '../../parameters';

exports.default = (): any => {
  let talkID: string;
  let temporaryTalkID: string;

  before(async () => {
    const talksList = await parameters.talksService.list();

    talkID = talksList[0]._id.toString();
  });

  it('GET /talks/list (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .get(`/talks/list`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          const expected = [
            {
              _id: talkID,
              name: parameters.talkName,
              description: parameters.talkDescription,
              user: parameters.user,
            },
          ];

          expect(res.body).to.eql(expected);
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });

  it('GET /talks/list/test_user (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .get(`/talks/list/test_user`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          const expected = [
            {
              _id: talkID,
              user: parameters.user,
              name: parameters.talkName,
              description: parameters.talkDescription,
            },
          ];

          expect(res.body).to.eql(expected);
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });

  it('GET /talks/:talk_id (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .get(`/talks/${talkID}`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          const expected = {
            _id: talkID,
            user: parameters.user,
            name: parameters.talkName,
            description: parameters.talkDescription,
          };


          expect(res.body).to.eql(expected);
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });


  it('POST /talks/ (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .post(`/talks/`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .send({
          name: 'Hello',
          description: 'Hello world !',
        })
        .then((res: Response) => {
          expect(res.body.token).to.not.equal(null);

          temporaryTalkID = res.body.id;

          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });

  it('DELETE /talks/:talk_id (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .delete(`/talks/${temporaryTalkID}`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          expect(res.body.token).to.not.equal(null);

          temporaryTalkID = res.body._id;

          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });

  it('GET /talks/list (user) [200]', (done: Mocha.Done) => {
    chai.request(global.expressApp)
        .get(`/talks/list`)
        .set('Authorization', `Bearer ${parameters.token}`)
        .then((res: Response) => {
          const expected = [
            {
              _id: talkID,
              name: parameters.talkName,
              description: parameters.talkDescription,
              user: parameters.user,
            },
          ];

          expect(res.body).to.eql(expected);
          expect(res).to.have.status(200);
          done();
        }).catch((err) => {
          return done(err);
        });
  });
};
