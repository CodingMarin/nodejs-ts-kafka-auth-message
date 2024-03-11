import * as dotenv from "dotenv";
import jwt, { SignOptions } from "jsonwebtoken";
import { CustomError } from "../../utils";

dotenv.config();

export class JwtService {
  protected static ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
  protected static REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
  protected static ACCESS_LIFETIME =
    parseInt(process.env.ACCESS_TOKEN_LIFETIME, 10) || 3600; // 1 hora en segundos
  protected static REFRESH_LIFETIME =
    parseInt(process.env.REFRESH_TOKEN_LIFETIME, 10) || 604800; // 7 días en segundos

  protected static signToken = (
    id: string,
    secret: string,
    expiresIn: number,
    additionalPayload?: any,
    additionalSignOptions?: SignOptions,
  ) => {
    return jwt.sign({ sub: id, ...additionalPayload }, secret, {
      algorithm: "HS256",
      expiresIn: expiresIn,
      ...additionalSignOptions,
    });
  };

  static generateTokens = (id: string) => {
    const accessToken = JwtService.signToken(
      id,
      JwtService.ACCESS_SECRET,
      JwtService.ACCESS_LIFETIME,
    );
    const refreshToken = JwtService.signToken(
      id,
      JwtService.REFRESH_SECRET,
      JwtService.REFRESH_LIFETIME,
    );
    return { accessToken, refreshToken };
  };

  static authorizeAccessToken = (token: string) => {
    return JwtService.authorize(token, JwtService.ACCESS_SECRET);
  };

  static authorizeRefreshToken = (token: string) => {
    return JwtService.authorize(token, JwtService.REFRESH_SECRET);
  };

  static authorize = (token: string, secret: string) => {
    if (!token) throw new CustomError("Must provide authorization token", 403);
    try {
      const result = jwt.verify(token, secret);
      return typeof result === "string"
        ? result
        : (<{ sub: string }>result).sub;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        if (error.name === "TokenExpiredError")
          throw new CustomError("Token has expired", 401);
        throw error;
      }
    }
  };
}
