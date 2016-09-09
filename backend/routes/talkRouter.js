var express = require('express');
var passport = require('passport');
var httpStatus = require('http-status-codes');
var jwt = require('jwt-simple');
var config = require('../config/main');
var Talk = require('../models/talk');

Array.prototype.sum = function (prop) {
    var total = 0;
    for (var i = 0; i < this.length; i++) {
        total += this[i][prop]
    }
    return total;
};

var talkRouter = express.Router();

var requireAuth = passport.authenticate('jwt', {session: false});

talkRouter.route('/')
    .all(requireAuth)
    .get(function (req, res, next) {
        var promise = Talk.find({})
            .populate('postedBy', 'username')
            .populate('ratings.ratedBy')
            .exec(function(err, talks) {

                if (err) throw err;

                var modifiedTalks = talks.map(function (talk) {
                    var talkObject = talk.toObject();

                    talkObject.rated = false;

                    if (req.user) {
                        for (var i = 0; i < talkObject.ratings.length; i++) {
                            if (talkObject.ratings[i].ratedBy._id.toString() === req.user._id.toString()) {
                                talkObject.rated = true;
                                break;
                            }
                        }
                    }

                    talkObject.rating = talkObject.ratings.sum("rating");
                    
                    return talkObject;
                });
                
                res.json(modifiedTalks);
            });

    })
    .post(function (req, res, next) {
        if (!req.body.title || !req.body.description) {
            res.status(httpStatus.BAD_REQUEST).json({message: 'title, description required'});
            return;
        }

        req.body.postedBy = req.user._id;

        Talk.create(req.body, function (err, talk) {
            if (err) throw err;
            res.status(httpStatus.CREATED).json(talk);
        });
    });


talkRouter.route('/:talkId/rating')
    .post(requireAuth, function (req, res, next) {
        if (!req.body.rating) {
            res.status(httpStatus.BAD_REQUEST).json({message: 'rating required'});
            return;
        }

        Talk.findOne({
            '_id': req.params.talkId,
            'ratings.ratedBy': {"$ne": req.user._id}
        }, function (err, talk) {
            if (err) throw err;

            if (talk) {
                req.body.ratedBy = req.user._id;
                console.log(req.body);
                talk.ratings.push(req.body);

                talk.save(function (err, talk) {
                    if (err) {
                        console.log(err);
                        throw err;
                        
                    }
                    res.status(httpStatus.CREATED).json({message: "Updated rating"});
                });
                
            }
            else {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({message: "Rated Before"});
            }
        });
    });

module.exports = talkRouter;
