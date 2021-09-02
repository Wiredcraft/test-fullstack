import { getTokenData, withServiceLayer } from "../../utils";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ServerResponse } from "../../interfaces";

const getUserDataFromToken = async (req: Request): Promise<ServerResponse> => {
  const { token } = req.query;
  const accessData = getTokenData(token as string);
  const userData = (accessData as JwtPayload).email;

  return {
    message: 'Data Decoded',
    userData,
    statusCode: 200
  };
}


export const getUserEncryptedEmail = withServiceLayer(getUserDataFromToken);