var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require("path");


router.get('/lightingTalks', function(req, res, next) {
  fs.readFile(path.join(__dirname,'../lib/lightingTalks.json'), function(err, data) {
    if (err) {
      throw err
    }
    res.json(JSON.parse(data));
  });

});

router.post('/lightingTalk', function(req, res, next) {
  fs.readFile(path.join(__dirname,'../lib/lightingTalks.json'), function(err, data) {
    if (err) {
      throw err;
    }
    var newData = JSON.parse(data)
    newData.push({
      ceratedAt: newData(),
      username: 's',
      title: 'sss',
      description: 'sssssss',
      id: newData.length + 1,
      votes: 0
    })
    fs.writeFile(path.join(__dirname,'../lib/lightingTalks.json'), JSON.stringify(newData),  function(err) {
      if (err) {
        throw err;
      }
      res.json(newData);
    });
  });
});

router.put('/vote', function(req, res) {
  fs.readFile(path.join(__dirname,'../lib/lightingTalks.json'), function(err, data) {
    if (err) {
      throw err;
    }
    var newData = JSON.parse(data)
    newData[req.id].vote += 1
    fs.writeFile(path.join(__dirname,'../lib/lightingTalks.json'), JSON.stringify(newData),  function(err) {
      if (err) {
        throw err;
      }
      res.json(newData);
    });
  });
});

module.exports = router;
