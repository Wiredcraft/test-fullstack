
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const websocket = require('./websocket');

const port = 3050;

exports.setup = function(app, express) {
  // Store all of user post on the array.
  app.locals.talks = [];

  const websocketServer = websocket.connect(app);

  const router = express.Router();

  app.use(cors({
    origin: [
      'http://localhost:1234',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  router.use(function(req, res, next) {
    console.log('Received body from client:')
    console.log(req.body);
    next();
  });

  router.route('/talks')
    
    // GET /api/talks
    .get(function(req, res, next) {
      console.log('Get talks')
      res.json(app.locals.talks);
      next();
    })

    // POST /api/talks
    .post(function(req, res, next) {
      const data = {
        user_id: req.session.id,
        title: req.body.title,
        content: req.body.content,
        rank: req.body.rank ? req.body.rank : 0,
        created_at: req.body.created_at
      };

      console.log('Saving posted talk');
      console.log(data);

      app.locals.talks.push(data);
      console.log('Post saved.')

      // Send latest talks to all clients.
      websocket.send(app, websocketServer);

      res.json(app.locals.talks);
      next();
    });

  router.route('/talks/:id')
    // GET /api/talks/:id
    .get(function(req, res, next) {
      const { id } = req.params;
      let talk = {};

      try {
        talk = app.locals.talks[id];
      } catch (error) {
      }

      res.json(talk);
      
      next();
    });

  router.route('/talks/:id/vote-up')
    // PUT /api/talks/:id/vote-up
    // Update rank
    .put(function(req, res, next) {
      const { id } = req.params;

      if (app.locals.talks[id].user_id === req.session.id) {
        app.locals.talks[id].rank += 1;
        console.log(`Update rank by id: ${id}, user id: ${req.session.id}`);
        websocket.send(app, websocketServer);
      }

      res.json(app.locals.talks);
      next();
    });

  router.route('/profile')
    // GET /api/profile
    .get(function(req, res, next) {
      const user = {
        id: req.session.id
      };

      console.log('Get profile');
      res.json(user);
      next();
    })

  app.use('/api', router);

  app.listen(port, () => {
    console.log(`listening http://localhost:${port}`);
  });

  app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
};
