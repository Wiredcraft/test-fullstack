import expressJwt from "express-jwt";
import { JWT_SECRET } from "../constants/auth";

const unprotectedRoutes = [
  { url: "/users", methods: ["POST"] },
  "/users/login"
];

const jwtMiddleware = expressJwt({
  secret: JWT_SECRET,
  credentialsRequired: false
}).unless({
  path: unprotectedRoutes
});

export default jwtMiddleware;
