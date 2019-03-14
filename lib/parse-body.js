import { StringDecoder } from "string_decoder";
import HTTPError from "./http-error";

const supportedContentType = /^application\/json(?:; ?charset=utf-8)?$/;
const LIMIT = 1024 * 1024;
const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;

export default async function parseBody(req) {
  const contentType = req.headers["content-type"];
  if (contentType && !supportedContentType.test(contentType)) {
    throw new HTTPError(415);
  }

  const contentEncoding = req.headers["content-encoding"];
  if (contentEncoding) {
    throw new HTTPError(415);
  }

  let length = req.headers["content-length"];
  if (length) length = Number(length);
  if (Number.isNaN(length)) length = 0;
  if (length && length > LIMIT) {
    throw new HTTPError(413);
  }

  const decoder = new StringDecoder();
  let received = 0;
  let str = "";

  return await new Promise((resolve, reject) => {
    req.on("aborted", () => {
      req.pause();
      reject(new HTTPError(400, "request aborted"));
    });

    req.on("data", chunk => {
      received += chunk.length;

      if (received > LIMIT) {
        req.pause();
        reject(new HTTPError(413));
        return;
      }

      str += decoder.write(chunk);
    });

    req.on("end", () => {
      if (length !== received) {
        reject(
          new HTTPError(400, "request body size did not match content length")
        );
        return;
      }

      const remaining = decoder.end();
      if (remaining) str += remaining;

      if (!str) resolve({});

      if (!strictJSONReg.test(str)) {
        reject(
          new HTTPError(400, "invalid JSON, only supports object and array")
        );
        return;
      }

      try {
        resolve(JSON.parse(str));
      } catch (err) {
        reject(new HTTPError(400, "invalid JSON"));
      }
    });

    req.on("error", reject);
  });
}
