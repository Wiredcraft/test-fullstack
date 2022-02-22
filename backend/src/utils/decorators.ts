import { authenticate } from "@loopback/authentication";
import { JWTStrategyName } from "../components/jwt-authentication";

export function needAuthentication() {
  return authenticate(JWTStrategyName)
}