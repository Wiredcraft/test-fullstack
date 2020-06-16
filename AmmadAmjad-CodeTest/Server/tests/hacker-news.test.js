const request = require('supertest')
const app = require('../server')


var token = "";
var commentId =  1;
describe('Create User', () => {
    it('Should create a new user', async () => {
        const res = await request(app)
        .post('/user/register')
        .send({
            "email"  : "ammadtarar@gmail.com",
            "password" : "abcd1234",
            "name" : "Ammad Amjad"
        })        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    });
});


describe('User Login', () => {
    it('Login User', async () => {
        const res = await request(app)
        .post('/user/login')
        .send({
            "email"  : "ammadtarar@gmail.com",
            "password" : "abcd1234"
        })        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        token = JSON.parse(res.text).user.token;
    });
});


describe('Create Comment', () => {
    it('Create new comment from user', async () => {
        const res = await request(app)
        .post('/comment/create')
        .set('Authorization' , token)
        .send({
            "title" : "This is the third",
            "description" : "This is the description"
        })        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('comment')
        commentId = JSON.parse(res.text).comment.id;
    });
});


describe('Fetch All Comments', () => {
    it('Get All Comments', async () => {
        const res = await request(app)
        .get('/comment/list/all')
        .set('Authorization' , token)
        .send()        
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('rows')
    });
});


describe('Vote For Comment', () => {
    it('Vote for one comment', async () => {
        const res = await request(app)
        .post('/comment/'+ commentId +'/vote')
        .set('Authorization' , token)
        .send()        
        expect(res.statusCode).toEqual(200)
    });
});


describe('Recind Vote For Comment', () => {
    it('Cancel vote for the comment', async () => {
        const res = await request(app)
        .delete('/comment/'+ commentId +'/vote')
        .set('Authorization' , token)
        .send()        
        expect(res.statusCode).toEqual(200)
    });
});

describe('Delete Comment by ID', () => {
    it('Delete comment', async () => {
        const res = await request(app)
        .delete('/comment/'+ commentId)
        .set('Authorization' , token)
        .send()        
        expect(res.statusCode).toEqual(200)
    });
});

describe('User Logout', () => {
    it('Logout User', async () => {
        const res = await request(app)
        .delete('/user/logout')
        .set('Authorization' , token)
        .send()               
        expect(res.statusCode).toEqual(200)

    });
});

