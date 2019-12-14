// server.js
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

const postRoutes = require('./expressRoutes/postRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postRoutes);

var port = process.env.PORT || 4000;

mongoose
    .connect(config.DB)
    .then((result) => {
        console.log('Database is connected')
        app.listen(port, function(){
            console.log('Listening on port ' + port);
        })
    })
    .catch(err => {
        console.log('Can not connect to the database'+ err)
    });