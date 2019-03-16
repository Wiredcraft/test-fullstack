import * as fs from "fs";
import { gzipSync } from "zlib";
import { createHash } from "crypto";
import { extname } from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const files = {};
const MIMETypes = {
  js: "application/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  css: "text/css; charset=utf-8"
};

if (process.env.NODE_ENV === "production") {
  fs.readdirSync("dist").forEach(filename => {
    const buffer = fs.readFileSync(`dist/${filename}`);
    const gzipBuffer = gzipSync(buffer);
    const md5 = createHash("md5")
      .update(buffer)
      .digest("hex")
      .slice(0, 20);

    files[filename] = { buffer, gzipBuffer, md5 };
  });
}

export const getAssetName = filename => {
  if (process.env.NODE_ENV !== "production") {
    return filename;
  }
  const [name, ext] = filename.split(".");
  return `${name}.${files[filename].md5}.${ext}`;
};

export default (urlPrefix, dir) => {
  return next => async (req, res) => {
    if (!req.url.startsWith(urlPrefix)) {
      return await next(req, res);
    }

    const filename = req.url.slice(urlPrefix.length);

    if (process.env.NODE_ENV !== "production") {
      let buffer;
      try {
        buffer = await readFile(`${dir}/${filename}`);
      } catch (err) {
        if (err.code === "ENOENT") throw 404;
        throw err;
      }
      res.setHeader("Content-Type", MIMETypes[extname(filename).slice(1)]);
      res.setHeader("Content-Length", buffer.length);
      res.end(buffer);
      return;
    }

    const [name, md5, ext] = filename.split(".");
    const finalFilename = `${name}.${ext}`;
    const file = files[finalFilename];

    if (!file) throw 404;

    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", MIMETypes[ext]);
    res.setHeader("Content-Length", file.gzipBuffer.length);
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.end(file.gzipBuffer);
  };
};
