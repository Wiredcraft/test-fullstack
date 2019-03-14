import * as qs from "querystring";
import db from "../db";

const join = arr => arr.join(", ");

const wrapParens = str => `(${str})`;

const toRow = arr => wrapParens(join(arr));

const fields = [
  "title",
  "description",
  "username"
];

export const create = async (req, res, query, form) => {
  const entries = Object.entries(form)
    .filter(([name, value]) => fields.includes(name));
  const keys = entries.map(v => v[0]);
  const values = entries.map(v => v[1]);

  try {
    const result = await db.query(
      `insert into talks ${toRow(keys)}` +
        ` values ${toRow(keys.map((v, i) => `$${i + 1}`))} returning *`,
      values
    );

    return result.rows[0];
  } catch (err) {
    res.statusCode = 400;
    return { name: err.message };
  }
}

export const list = async (req, res, query) => {
  const { after_id = 0, limit = 20 } = qs.parse(query);
  const user = "magjckang";

  const { rows } = await db.query(
    "select" +
      " id, title, time_created, talks.username, rating" +
      ", cast(talk_id as boolean) as voted" +
      " from talks left join votes on id = talk_id and votes.username = $1" +
      " where id > $2 order by rating desc, time_created desc limit $3",
    [user, after_id, limit]
  );

  rows.forEach(row => {
    // if there is no record in `votes` rated will be `null`
    // can't find a proper cast solution in SQL
    row.voted = Boolean(row.voted);
  });

  return rows;
}

export const read = async (req, res, query, id) => {
  const user = "magjckang";

  const { rows } = await db.query(
    "select" +
      " id, title, time_created, talks.username, rating, description" +
      ", cast(talk_id as boolean) as voted" +
      " from talks left join votes on id = talk_id and votes.username = $1" +
      " where id = $2",
    [user, id]
  );

  if (!rows.length) {
    res.statusCode = 404;
    return;
  }

  return rows[0];
}

export const vote = async (req, res, query, id) => {
  const client = await db.connect();
  const user = "magjckang";
  let result;

  await client.query("begin");

  try {
    result = await db.query(
      "insert into votes (username, talk_id) values ($1, $2) on conflict do nothing",
      [user, id]
    );
  } catch (err) {
    await client.query("rollback");
    throw err;
  }

  if (result.rowCount) {
    try {
      result = await db.query(
        `update talks set rating = rating+1 where id = ${id}`
      );
    } catch (err) {
      await client.query("rollback");
      throw err;
    }

    if (!result.rowCount) {
      await client.query("rollback");
    }
  }

  await client.query("commit");
};

export const unvote = async (req, res, query, id) => {
  const client = await db.connect();
  const user = "magjckang";
  let result;

  await client.query("begin");

  try {
    result = await db.query(
      "delete from votes where username = $1 and talk_id = $2",
      [user, id]
    );
  } catch (err) {
    await client.query("rollback");
    throw err;
  }

  if (result.rowCount) {
    try {
      result = await db.query(
        `update talks set rating = rating-1 where id = ${id}`
      );
    } catch (err) {
      await client.query("rollback");
      throw err;
    }

    if (!result.rowCount) {
      await client.query("rollback");
    }
  }

  await client.query("commit");
};
