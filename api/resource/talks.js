import * as qs from "querystring";
import db from "../db";

export const create = async (req, res, query, form) => {
  const { user } = req;

  if (!user) {
    res.statusCode = 401;
    return;
  }

  const { title, description } = form;

  if (!title || !description) {
    res.statusCode = 400;
    return { name: title ? "Content Required" : "Title Required" };
  }

  const result = await db.query(
    `insert into talks` +
      ` (title, description, username) values ($1, $2, $3) returning *`,
    [title, description, user]
  );

  return result.rows[0];
};

export const list = async (req, res, query) => {
  const { after_id = 0, limit = 20 } = qs.parse(query);

  const { rows } = await db.query(
    "select" +
      " id, title, time_created, talks.username, rating" +
      ", cast(talk_id as boolean) as voted" +
      " from talks left join votes on id = talk_id and votes.username = $1" +
      " where id > $2 order by rating desc, time_created desc limit $3",
    [req.user || null, after_id, limit]
  );

  rows.forEach(row => {
    // if there is no record in `votes` rated will be `null`
    // can't find a proper cast solution in SQL
    row.voted = Boolean(row.voted);
  });

  return rows;
};

export const read = async (req, res, query, id) => {
  const { rows } = await db.query(
    "select" +
      " id, title, time_created, talks.username, rating, description" +
      ", cast(talk_id as boolean) as voted" +
      " from talks left join votes on id = talk_id and votes.username = $1" +
      " where id = $2",
    [req.user || null, id]
  );

  if (!rows.length) {
    res.statusCode = 404;
    return;
  }

  return rows[0];
};

export const vote = async (req, res, query, id) => {
  const { user } = req;

  if (!user) {
    res.statusCode = 401;
    return;
  }

  const {
    rows: [talk]
  } = await db.query("select username from talks where id = $1", [id]);

  if (!talk) {
    res.statusCode = 404;
    return;
  }

  if (talk.username === user) {
    res.statusCode = 400;
    return;
  }

  const client = await db.connect();
  let result;

  await client.query("begin");

  try {
    result = await db.query(
      "insert into votes (username, talk_id) values ($1, $2) on conflict do nothing",
      [user, id]
    );
  } catch (err) {
    await client.query("rollback");
    client.release();
    throw err;
  }

  if (result.rowCount) {
    try {
      result = await db.query(
        `update talks set rating = rating+1 where id = ${id}`
      );
    } catch (err) {
      await client.query("rollback");
      client.release();
      throw err;
    }

    if (!result.rowCount) {
      await client.query("rollback");
      client.release();
    }
  }

  await client.query("commit");
  client.release();
};

export const unvote = async (req, res, query, id) => {
  const { user } = req;

  if (!user) {
    res.statusCode = 401;
    return;
  }

  const r = await db.query("select 1 from talks where id = $1", [id]);

  if (!r.rowCount) {
    res.statusCode = 404;
    return;
  }

  const client = await db.connect();
  let result;

  await client.query("begin");

  try {
    result = await db.query(
      "delete from votes where username = $1 and talk_id = $2",
      [user, id]
    );
  } catch (err) {
    await client.query("rollback");
    client.release();
    throw err;
  }

  if (result.rowCount) {
    try {
      result = await db.query(
        `update talks set rating = rating-1 where id = ${id}`
      );
    } catch (err) {
      await client.query("rollback");
      client.release();
      throw err;
    }

    if (!result.rowCount) {
      await client.query("rollback");
      client.release();
    }
  }

  await client.query("commit");
  client.release();
};
