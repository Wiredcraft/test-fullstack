const sqlite3 = require('sqlite3').verbose();
import path from 'path';

const dbName = 'database.db';
let db = new sqlite3.Database(path.resolve(__dirname, '..', dbName), err => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite', dbName);
});

db.run(
  `CREATE TABLE IF NOT EXISTS topics(
    id integer primary key,
    user text, 
    title text, 
    description text, 
    rating integer, 
    date integer
  )`
);

export const selectAllTopics = callback => {
  db.all(`SELECT * FROM topics`, callback);
};

export const selectSingleTopic = ({ id }, callback) => {
  db.get(`SELECT * FROM topics WHERE id = ?`, [id], callback);
};

export const insertTopic = (
  { user, title, description, rating, date },
  callback
) => {
  db.run(
    `INSERT INTO topics(user, title, description, rating, date) VALUES(?, ?, ?, ?, ?)`,
    [user, title, description, rating, date],
    callback
  );
};

export const updateTopicRating = ({ id, rating }, callback) => {
  selectSingleTopic({ id }, (err, row) => {
    if (err) throw err.message;
    const currentRating = row.rating;
    const newRating = currentRating + rating < 0 ? 0 : currentRating + rating;

    db.run(
      `UPDATE topics SET rating = ? WHERE id = ?`,
      [newRating, id],
      callback
    );
  });
};
