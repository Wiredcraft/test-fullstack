require('dotenv').config();
// const firebase = require('firebase');
const admin = require('firebase-admin');

const serviceAccountKey = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: process.env.FIREBASE_DATABASEURL
});

const db = admin.database();

// const provider = new firebase.auth.GithubAuthProvider();

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

module.exports = {
  db,
  writeTalk
};
