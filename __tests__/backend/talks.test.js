const api = require('../../backend/api');
const helper = require('./helper');

describe('talks', function() {
  let res;

  beforeEach(function() {
    res = new helper.MockRes();
  });

  describe('GET', function() {
    it('empty', function() {
      api({
        method: 'GET',
        path: '/api/talks',
        headers: {}
      }, res);

      expect(res.body).toEqual('{"data":[]}');
    });

    it('has a item', function() {
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

      const data = JSON.parse(res.body).data;

      expect(data.length).toEqual(1);
      expect(data[0].title).toEqual('title');
      expect(data[0].description).toEqual('description');
      expect(data[0].user).toEqual('test');
    });
  });

  describe('POST', function() {
    it('should work', function() {
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

      expect(res.statusCode).toEqual(201);
    });

    it('not login', function() {
      expect(function(){
        api({
          method: 'POST',
          path: '/api/talks',
          headers: {},
          body: JSON.stringify({
            title: 'title',
            description: 'description'
          })
        }, res);
      }).toThrow(Error('login required.'));
    });

    it('no title', function() {
      expect(function(){
        api({
          method: 'POST',
          path: '/api/talks',
          headers: {
            cookie: `session=${helper.encodeSession({ username: 'test' })}`
          },
          body: JSON.stringify({
            description: 'description'
          })
        }, res);
      }).toThrow(Error('title required.'));
    });

    it('no description', function() {
      expect(function(){
        api({
          method: 'POST',
          path: '/api/talks',
          headers: {
            cookie: `session=${helper.encodeSession({ username: 'test' })}`
          },
          body: JSON.stringify({
            title: 'title'
          })
        }, res);
      }).toThrow(Error('description required.'));
    });
  });
});