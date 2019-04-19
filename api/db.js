require('dotenv').config();
const admin = require('firebase-admin');

const { sumVotes } = require('./utils');

const serviceAccountKey = JSON.parse(new Buffer(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: process.env.FIREBASE_DATABASEURL
});

const db = admin.database();

const writeTalk = ({ talkId, title, abstract, userId }) => {
  const isNew = !talkId;
  const updatedAt = new Date().valueOf();

  const ref = isNew
    ? db.ref('talks').push()
    : db.ref('talks/' + talkId);

  const talk = {
    title,
    abstract,
    updatedAt
  };

  if (isNew) {
    talk.userId = userId;
    talk.createdAt = updatedAt;
  }

  ref.set(talk);
};

const addVote = async ({ talkId, userId, val }) => {
  const ref = db.ref('talks/' + talkId);

  const snapshot = await ref.once('value');

  const talk = snapshot.val();

  talk.votes = talk.votes || [];

  const voteFromThisUser = talk.votes.find(vote => vote.userId === userId);

  if (voteFromThisUser) {
    voteFromThisUser.val = val;
  } else {
    talk.votes.push({ userId, val });
  }

  ref.set(talk);

  return sumVotes(talk.votes);
};

const auth = idToken => {
  try {
    const decodedToken = admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    return decodedToken;
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  db,
  writeTalk,
  addVote,
  auth
};
