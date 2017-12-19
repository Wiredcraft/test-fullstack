var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require("path");

/* GET Talks*/
router.get('/lightingTalks', function(req, res, next) {
  fs.readFile(path.join(__dirname,'../lib/lightingTalks.json'), function(err, data) {
    if (err) {
      throw err
    }
    console.log( JSON.parse(data));
    res.json(JSON.parse(data));
  });

});

router.post('/lightingTalk', function(req, res, next) {
  fs.readFile(path.join(__dirname,'../lib/lightingTalks.json'), function(err, data) {
    if (err) {
      throw err
    }
    var newData = JSON.parse(data)
    newData.push({username: 's', title: 'sss', description: 'sssssss', id: newData.length + 1})
    fs.writeFile(path.join(__dirname,'../lib/lightingTalks.json'), JSON.stringify(newData),  function(err) {
      if (err) {
        return console.error(err);
      }
      res.json(newData);
    });
  });
});

module.exports = router;
