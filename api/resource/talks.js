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

export const create = async (req, res, form) => {
  const entries = Object.entries(form)
    .filter((name, value) => fields.includes(name));
  const keys = entries.map(v => v[0]);
  const values = entries.map(v => v[1]);

  try {
    const result = await db.query(
      `insert into talks ${toRow(keys)}` +
        ` values ${toRow(keys.map((v, i) => `$${i + 1}`))} returning *`,
      values
    );
  } catch (err) {
    res.statusCode = 400;
    return { name: err.message };
  }
}

export const list = async (req, res, query) => {
  const { after_id = 0, limit = 20 } = qs.parse(query);

  const { rows } = await db.query(
    "select * from talks where id > $1 limit $2",
    [after_id, limit]
  );

  return rows;
}

export const read = async (req, res, id) => {
  const { rows } = await db.query("select * from talks where id = $1", [id]);

  if (!rows.length) {
    res.statusCode = 404;
    return;
  }

  return rows[0];
}
