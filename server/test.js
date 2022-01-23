const test = require('ava');
const superagent = require('superagent');


test('hacknews.register', async t => {
    await new Promise((resolve) => {
        superagent
            .post('http://localhost:8000')
            .send({
                action: 'hacknews.register',
                params: {
                    name: 'hello',
                    password: 'hello'
                }
            })
            .end((err, res) => {
                resolve(t.is(res.body.success, true))
            });
    })
});


test('hacknews.login', async t => {
    await new Promise((resolve) => {
        superagent
            .post('http://localhost:8000')
            .send({
                action: 'hacknews.login',
                params: {
                    name: 'hello',
                    password: 'hello'
                }
            })
            .end((err, res) => {
                resolve(t.is(res.body.success, true))
            });
    })
});

test('hacknews.addTalk', async t => {
    await new Promise((resolve) => {
        superagent
            .post('http://localhost:8000')
            .send({
                action: 'hacknews.addTalk',
                params: {
                    title: 'hello',
                    description: 'hello hello hello',
                    createdBy: ''
                }
            })
            .end((err, res) => {
                resolve(t.is(res.body.success, true))
            });
    })   
});

test('hacknews.pageTalk', async t => {
    await new Promise((resolve) => {
        superagent
            .post('http://localhost:8000')
            .send({
                action: 'hacknews.pageTalk',
                params: {
                    page: 1,
                    pageSize: 10
                }
            })
            .end((err, res) => {
                resolve(t.is(res.body.success, true))
            });
    })   
});

test('hacknews.voteTalk', async t => {
    await new Promise((resolve) => {
        superagent
            .post('http://localhost:8000')
            .send({
                action: 'hacknews.voteTalk',
                params: {
                    talk: "",
                    voteBy: ""
                }
            })
            .end((err, res) => {
                resolve(t.is(res.body.success, true))
            });
    })   
});