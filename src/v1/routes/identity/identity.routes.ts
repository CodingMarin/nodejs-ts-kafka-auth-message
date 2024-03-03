import { Router } from "express";
import { ErrorHandlerWrapper } from "../../../utils";
import * as handlers from "./identity.handlers";

const identityRouter = Router();

identityRouter.post(
  "/verify",
  ErrorHandlerWrapper(handlers.verifyIdentityHandler),
);

export { identityRouter };
