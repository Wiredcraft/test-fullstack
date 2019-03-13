import * as fs from "fs";
import * as path from "path";
import App from "../lib/application";

export default (urlPrefix, filePathPrefix) => {
  return next => async (req, res) => {
    if (!req.url.startsWith(urlPrefix)) {
      return await next(req, res);
    }

    const filePath = req.url.slice(urlPrefix.length);
    let stream;

    try {
      stream = fs.createReadStream(`${filePathPrefix}${filePath}`);
    } catch (err) {
      App.basicResponse(res, 404);
      return;
    }

    stream.on("error", () => {
      if (!stream.bytesRead) {
        App.basicResponse(res, 404);
        return;
      }
      res.end();
    })

    let contentType;
    switch (path.extname(filePath)) {
      case ".js":
        contentType = "application/javascript; charset=utf-8";
        break;
      case ".css":
        contentType = "text/css; charset=utf-8";
        break;
      case ".json":
        contentType = "application/json; charset=utf-8";
      default:
        contentType = "text/plain";
    }

    res.setHeader("Content-Type", contentType);
    stream.pipe(res);

    await new Promise((resolve, reject) => {
      res.on("close", resolve);
      res.on("finish", resolve);
      res.on("error", reject);
    });
  }
}
