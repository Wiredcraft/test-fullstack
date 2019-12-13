const helper = require('./helper');

const users = new Map();
let talks = [];

module.exports = function(req, res){
  res.setHeader('Content-Type', 'application/json');

  if(req.body){
    req.body = JSON.parse(req.body);
  }

  var session = helper.decodeSession(req.headers['cookie']);

  switch(req.path){
    case '/api/sessions':
      switch(req.method){
        case 'GET':
          if(session.username){
            res.write(JSON.stringify({ data: session.username }));
          }else{
            res.write(JSON.stringify({ data: null }));
          }
          break;
        case 'POST':
          if(!req.body.username) throw Error('username required.');
          if(!req.body.password) throw Error('password required.');

          if(users.has(req.body.username)){
            if(users.get(req.body.username) === req.body.password){
              res.statusCode = 201;
            }else{
              throw Error('username or password wrong.');
            }
          }else{
            users.set(req.body.username, req.body.password);
            res.statusCode = 201;
          }

          if(res.statusCode === 201){
            res.setHeader('Set-Cookie', `session=${helper.encodeSession({ username: req.body.username })};path=/;HttpOnly;SameSite=Strict;`)
          }
          break;
        case 'DELETE':
          res.statusCode = 201;
          res.setHeader('Set-Cookie', 'session=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;');
          break;
      }
      break;
    case '/api/talks':
      switch (req.method) {
        case 'GET':
          res.write(JSON.stringify({ data: talks }));
          break;
        case 'POST':
          if(!session.username) throw Error('login required.');
          if(!req.body.title) throw Error('title required.');
          if(!req.body.description) throw Error('description required.');

          talks.push({
            id: helper.uuid(),
            user: session.username,
            title: req.body.title,
            description: req.body.description,
            votes: [],
            created_at: new Date().getTime()
          });

          res.statusCode = 201;
          break;
      }
      
      break;
    case '/api/votes':
      switch (req.method) {
        case 'PUT':
          if(!session.username) throw Error('login required.');
          if(!req.body.talk_id) throw Error('talk_id required.');

          var talk = talks.find(t => t.id === req.body.talk_id);
          var index = talk.votes.indexOf(session.username);
          if(index === -1){
            talk.votes.push(session.username);
          }else{
            talk.votes.splice(index, 1);
          }
          talks = talks.sort((a, b) => a.votes.length < b.votes.length ? 1 : -1);

          res.statusCode = 201;
          break;
      }
      break;
  }
}