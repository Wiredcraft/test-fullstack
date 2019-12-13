const api = require('../../backend/api');
const helper = require('./helper');

describe('talks', function() {
  let res;

  beforeEach(function() {
    res = new helper.MockRes();
  });

  it('vote & unvote', function() {
    api({
      method: 'POST',
      path: '/api/talks',
      headers: {
        cookie: `session=${helper.encodeSession({ username: 'test' })}`
      },
      body: JSON.stringify({
        title: 'title',
        description: 'description'
      })
    }, res);

    api({
      method: 'GET',
      path: '/api/talks',
      headers: {}
    }, res.reset());

    let talk_id = JSON.parse(res.body).data[0].id;

    api({
      method: 'PUT',
      path: '/api/votes',
      headers: {
        cookie: `session=${helper.encodeSession({ username: 'test' })}`
      },
      body: JSON.stringify({
        talk_id
      })
    }, res);

    expect(res.statusCode).toEqual(201);

    api({
      method: 'GET',
      path: '/api/talks',
      headers: {}
    }, res.reset());

    let talk = JSON.parse(res.body).data[0];

    expect(talk.votes).toEqual(['test']);

    api({
      method: 'PUT',
      path: '/api/votes',
      headers: {
        cookie: `session=${helper.encodeSession({ username: 'test' })}`
      },
      body: JSON.stringify({
        talk_id
      })
    }, res.reset());

    expect(res.statusCode).toEqual(201);

    api({
      method: 'GET',
      path: '/api/talks',
      headers: {}
    }, res.reset());

    talk = JSON.parse(res.body).data[0];

    expect(talk.votes).toEqual([]);
  });

  it('sort', function() {
    api({
      method: 'POST',
      path: '/api/talks',
      headers: {
        cookie: `session=${helper.encodeSession({ username: 'test' })}`
      },
      body: JSON.stringify({
        title: 'title2',
        description: 'description'
      })
    }, res.reset());

    api({
      method: 'GET',
      path: '/api/talks',
      headers: {}
    }, res.reset());

    let talks = JSON.parse(res.body).data;

    expect(talks[0].title).toEqual('title');
    expect(talks[1].title).toEqual('title2');

    api({
      method: 'PUT',
      path: '/api/votes',
      headers: {
        cookie: `session=${helper.encodeSession({ username: 'test' })}`
      },
      body: JSON.stringify({
        talk_id: talks[1].id
      })
    }, res.reset());

    api({
      method: 'GET',
      path: '/api/talks',
      headers: {}
    }, res.reset());

    talks = JSON.parse(res.body).data;

    expect(talks[0].title).toEqual('title2');
    expect(talks[1].title).toEqual('title');
  });

  it('not login', function() {
    expect(function(){
      api({
        method: 'PUT',
        path: '/api/votes',
        headers: {},
        body: null
      }, res);
    }).toThrow(Error('login required.'));
  });

  it('no talk_id', function() {
    expect(function(){
      api({
        method: 'PUT',
        path: '/api/votes',
        headers: {
          cookie: `session=${helper.encodeSession({ username: 'test' })}`
        },
        body: '{}'
      }, res);
    }).toThrow(Error('talk_id required.'));
  });
});
