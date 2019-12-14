const Post = require('../models/Post');

exports.getPosts = (req, resp, next) => {
  Post.find((err, posts) => {
      if(err) {
          console.log(err);
      } else {
          resp.json(posts);
      }
  })
};

exports.addPost = (req, resp, next) => {
  let post = new Post(req.body);
  post.save().then(event => {
      resp.status(200).json({'event': 'Adding a Post!'});
  })
  .catch(err => {
      resp.status(400).send('Unable to save post in database');
  })
}

exports.likePost = async (req, resp, next) => {
  const post = await Post.findById(req.params.productId);
  try {
    if (post) {
      post.likesAmount = req.body.likesAmount;
      await post.save();
      res.status(200).send('Post liked');
    }  
  } catch(error) {
    console.log(error);
  }
}
