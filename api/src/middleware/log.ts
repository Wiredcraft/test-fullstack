import path from "path";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";

const accessLogStream = createStream("access.log", {
  interval: "1d",
  path: path.join(process.cwd(), "log")
});

export default morgan("combined", { stream: accessLogStream });
