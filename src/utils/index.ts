import { Handler, Request, Response, NextFunction } from "express";
import { HandlerWithSub } from "../types";
import { JwtService } from "../services/shared/jwt.service";
import { Kafka } from "kafkajs";

export class CustomError extends Error {
  constructor(
    message: string,
    readonly statusCode: number = 500,
  ) {
    super(message);
  }
}

export const ErrorHandlerWrapper = (handler: Handler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      res.status(error.statusCode ?? 500).json({ message: error.message });
    }
  };
};

export const AuthorizationWrapper = (handler: HandlerWithSub) => {
  return async (req: Request, res: Response) => {
    try {
      const sub = JwtService.authorizeAccessToken(
        req.headers?.authorization.split(" ")[1],
      );
      await handler(req, res, sub);
    } catch (error) {
      console.log(
        `Unable to complete request ${req.method} ${req.path}, reason: `,
        error.message ?? error.name,
      );
      throw error;
    }
  };
};

export const cleanObject = (obj: any) => {
  for (let field in obj) {
    if (obj[field] === undefined || typeof obj[field] === "undefined")
      delete obj[field];
  }
  return obj;
};

export const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "my-app",
});
