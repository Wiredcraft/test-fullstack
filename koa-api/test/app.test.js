var assert = require('assert').strict;
const http = require('axios');
const uuid = require('../utils/uuid')

describe('uuid 测试', function() {
    describe('uuid()', function() {
        it('should return a string ', function() {
            assert.equal(typeof uuid(), 'string');
        });
    });
    describe('GET /api/talk', function() {
        it('should return a array', async function() {
            const response = await http({
                method: 'get',
                url: 'http://127.0.0.1:3000/api/talk'
            })
          assert.equal(Array.isArray(response.data), true)
        });
    });
});