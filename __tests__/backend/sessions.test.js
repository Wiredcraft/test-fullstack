const helper = require('./helper');
const api = require('../../backend/api');


describe('sessions', function() {
  let res;

  beforeEach(function() {
    res = new helper.MockRes();
  });

  describe('GET', function() {
    it('guest', function() {
      api({
        method: 'GET',
        path: '/api/sessions',
        headers: {}
      }, res);

      expect(res.body).toEqual('{"data":null}');
    });

    it('signed in', function() {
      api({
        method: 'GET',
        path: '/api/sessions',
        headers: {
          cookie: `session=${helper.encodeSession({ username: 'test' })}`
        }
      }, res);

      expect(res.body).toEqual('{"data":"test"}');
    });
  });

  describe('POST', function() {
    it('should work', function() {
      api({
        method: 'POST',
        path: '/api/sessions',
        headers: {},
        body: JSON.stringify({
          username: 'test',
          password: 'test'
        })
      }, res);

      expect(res.statusCode).toEqual(201);
      expect(res.headers['Set-Cookie']).toEqual(`session=${helper.encodeSession({username: 'test'})};path=/;HttpOnly;SameSite=Strict;`);
    });

    it('username missing', function() {
      expect(function(){
        api({
          method: 'POST',
          path: '/api/sessions',
          headers: {},
          body: JSON.stringify({
            password: 'test'
          })
        }, res);
      }).toThrow(Error('username required.'));
    });

    it('password missing', function() {
      expect(function(){
        api({
          method: 'POST',
          path: '/api/sessions',
          headers: {},
          body: JSON.stringify({
            username: 'test'
          })
        }, res);
      }).toThrow(Error('password required.'));
    });

    it('password wrong', function() {
      api({
        method: 'POST',
        path: '/api/sessions',
        headers: {},
        body: JSON.stringify({
          username: 'test',
          password: 'test'
        })
      }, res);

      expect(function(){
        api({
          method: 'POST',
          path: '/api/sessions',
          headers: {},
          body: JSON.stringify({
            username: 'test',
            password: 'wrong'
          })
        }, res.reset());
      }).toThrow(Error('username or password wrong.'));
    });
  });

  it('DELETE', function() {
    api({
      method: 'DELETE',
      path: '/api/sessions',
      headers: {}
    }, res);

    expect(res.headers['Set-Cookie']).toEqual('session=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;');
  });

  it('wrong session', function(){
    api({
      method: 'GET',
      path: '/api/sessions',
      headers: {
        cookie: `session=wrong`
      }
    }, res);

    expect(res.body).toEqual('{"data":null}');
  });
});