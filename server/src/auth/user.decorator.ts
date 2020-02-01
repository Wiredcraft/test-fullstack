import { createParamDecorator } from "@nestjs/common";

export const UserDecorator = createParamDecorator((data, req) => req.user);