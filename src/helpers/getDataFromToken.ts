import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";
import { decode } from "punycode";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRATE!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
