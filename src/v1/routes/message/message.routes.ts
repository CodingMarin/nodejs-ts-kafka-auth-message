import { Router } from "express";
import { AuthorizationWrapper, ErrorHandlerWrapper } from "../../../utils";
import * as handlers from "./message.handlers";

const messageRouter = Router();

messageRouter.post("/message", ErrorHandlerWrapper(handlers.messageHandler));

messageRouter.get(
  "/message",
  ErrorHandlerWrapper(AuthorizationWrapper(handlers.getAllMessagesHandler)),
);

export { messageRouter };
