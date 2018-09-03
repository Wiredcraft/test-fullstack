let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// (node:26944) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
mongoose.connect("mongodb://127.0.0.1/hacknews", {config: {autoIndex: false}}, function(err){
  if(err){ // todo: crash/panic.
    console.log('err connecting mongoDB: ', err)
  } else {
    console.log('Connected to mongodb!')
  }
});

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let UserSchema = new Schema({
  versionKey: false,
  /*
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  */
  username: {
    type: String,
    index: true,
    unique: true,
    // run following cmd in mongo shell:
    // > db.users.ensureIndex({username:1}, {unique:true})

    required: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// emailId: { type: String, unique: true, index: true},
// todo: is there an "ensureIndex" call???
let TalkSchema = new Schema({
  versionKey: false,
  _id: ObjectId, // topicID
  rootTopic: {type: Boolean, default: false}, // use this field to get all the root topics in index page, otherwise, using aggregate would be a little expensive
  ancestorId: ObjectId,
  parentId: ObjectId,
  title: String,
  url: String,
  isURL: {type: Boolean, default: false},
  text: String,
  publishBy: String,
  publishDate: {type: Date, default: Date.now},
  voters: { // array of username who casts vote on this topic
    type: [String],
  },
  points: Number, // the length of above voters array. This field exists to ease the calculation/sort of the number of voters
  commentNum: {type: Number, default: 0}, // the number of all replies/comments, shown in topicList, not in topicDetail
});

let User = mongoose.model('User', UserSchema);
let Topic = mongoose.model('Topic', TalkSchema);
exports.User = User;
exports.Topic = Topic;
