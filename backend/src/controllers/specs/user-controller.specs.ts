import { model, property } from "@loopback/repository";
import { UserWithRelations } from "../../models";

@model()
export class LoginResponse {
  @property({
    type: 'string'
  })
  token: string

  @property({
    type: 'object'
  })
  user: Omit<UserWithRelations, 'password'>
}

@model()
export class LoginRequest {
  @property({
    type: 'string',
    required: true
  })
  username: string

  @property({
    type: 'string',
    required: true
  })
  password: string
}