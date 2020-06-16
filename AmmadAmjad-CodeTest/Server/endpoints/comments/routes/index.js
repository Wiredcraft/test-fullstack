const {Router} = require('express');
const app = Router();
const underscore = require('underscore');
const db = require('../../../controllers/db.js');
const middleware = require('../../../controllers/middleware.js')(db);



app.post('/comment/create' , middleware.requireAuthentication , function(req , res){
    var body = underscore.pick(req.body, 'title', "description");
    body.authorId = req.user.id;
    db.comment.create(body)
    .then(function(comment){
      res.json({
        message : "Comment added successfully",
        comment : comment
      });
    })
    .catch(function(e){
      res.status(403).json({
        message : "Failed to add comment",
        error : String(e)
      });
    });
  });

  // GET COMMENTS LIST
  app.get('/comment/list/all' , middleware.optionalAuthentication , function(req , res){

    const limit = parseInt(req.query.limit) || 10;
		var page = parseInt(req.query.page) || 0;
		if (page >= 1) {
			page = page - 1;
		}
    var sortBy = req.query.sortBy || 'votes';
    if (sortBy === 'votes') {
      sortBy = db.sequelize.literal('votes');
    }
    var sort = req.query.sort || 'DESC';

    var attrs = ['id' , 'description' , 'title' , 'createdAt' , 'updatedAt',
    [db.sequelize.literal('(SELECT COUNT(*) FROM "commentVoters" where "commentVoters"."commentid" = "comment"."id")'), 'votes']];


    if (req.user) {
      attrs.push(
        [db.sequelize.literal('(SELECT COUNT(*) FROM "commentVoters" where "commentVoters"."commentid" = "comment"."id" AND "commentVoters"."userId" = ' + req.user.id + ')'), 'voted']
      );
    }

    db.comment.findAndCountAll({
			limit: limit,
			offset: limit * page,
      order: [
        [sortBy, sort]
      ],
      attributes: attrs,
      include : [
        {
          model: db.user,
          as: 'author',
          attributes : ['id' , 'name' , 'email']
        }
      ]
    })
    .then(function(comments){
      res.json(comments);
    })
    .catch(function(e){
      res.status(403).json({
        message : "Failed to fetch comments",
        error : String(e)
      });
    });
  });

  // DELETE BY ID
  app.delete('/comment/:id' , middleware.requireAuthentication , function(req , res){
    const id = parseInt(req.params.id);
		if (id === undefined || id === null || id <= 0) {
      res.status(403).json({
        message : "Please provide a valid comment iD"
      });
			return;
		}
    db.comment.findOne({
      where : {
        id : id
      }
    })
    .then(function(comment){
      if (!comment) {
        return res.status(404).json({
          message : "Comment not found. Please make sure the commentId is valid and comment exists"
        });
      }else if (comment && comment.authorId !== req.user.id) {
        return res.status(401).json({
          message : "Only comment author can delete the comment"
        });
      }else{
        db.comment.destroy({
          where : {
            id: id,
          }
        })
        .then(function(status){
          res.json({
            message : "Comment deleted successfully"
          });
        });
      }
    })
    .catch(function(e){
      res.status(403).json({
        message : "Failed to delete the comment",
        error : String(e)
      });
    });
  });

  // VOTE FOR THE COMMENT
  app.post('/comment/:id/vote' , middleware.requireAuthentication , function(req , res){
    const id = parseInt(req.params.id);
    if (id === undefined || id === null || id <= 0) {
      res.status(403).json({
        message : "Please provide a valid comment iD"
      });
      return;
    }

    db.commentVoters.findOne({
      where : {
        commentId : id,
        userId : req.user.id
      }
    })
    .then(function(existing){
      if (existing) {
        res.status(401).json({
          message : "You have already voted for this comment"
        });
      }else{
        db.commentVoters.create({
          commentId : id,
          userId : req.user.id
        })
        .then(function(status){
          res.json({
            message : "Vote added to the comment successfully"
          });
        })
      }
    })
    .catch(function(e){
      res.status(403).json({
        message : "Failed to add vote to the comment",
        error : String(e)
      });
    });

  });


  // RECIND VOTE
  app.delete('/comment/:id/vote' , middleware.requireAuthentication , function(req , res){
    const id = parseInt(req.params.id);
    if (id === undefined || id === null || id <= 0) {
      res.status(403).json({
        message : "Please provide a valid comment iD"
      });
      return;
    }

    db.commentVoters.findOne({
      where : {
        commentId : id,
        userId : req.user.id
      }
    })
    .then(function(existing){
      if (!existing) {
        res.status(401).json({
          message : "You have never voted for this comment before"
        });
      }else{
        db.commentVoters.destroy({
          where : {
            commentId : id,
            userId : req.user.id
          }
        })
        .then(function(status){
          res.json({
            message : "Vote rescinded successfully"
          });
        })
      }
    })
    .catch(function(e){
      res.status(403).json({
        message : "Failed to rescind the vote",
        error : String(e)
      });
    });

  });
module.exports = app;