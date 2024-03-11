import { Router } from "express";
import { ErrorHandlerWrapper, AuthorizationWrapper } from "../../../utils";
import * as handlers from "./user.handlers";

const userRouter = Router();

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surnames:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     surnames:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                     dni:
 *                       type: string
 *                     country:
 *                       type: string
 *                     photoUrl:
 *                       type: string
 *                     verified:
 *                       type: string
 *                     id:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     deletedAt:
 *                       type: string
 *                       nullable: true
 *       '400':
 *         description: Error in the request or email is already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Oops, seems like this email is already in use.
 *
 */

userRouter.post("/signup", ErrorHandlerWrapper(handlers.signupHandler));

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User data for logging in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the user
 *                     surnames:
 *                       type: string
 *                       description: Surnames of the user
 *                     email:
 *                       type: string
 *                       description: Email of the user
 *                     token:
 *                       type: string
 *                       description: JWT access token for authentication
 *       '400':
 *         description: Login access error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 */

userRouter.post("/login", ErrorHandlerWrapper(handlers.loginHandler));

/**
 * @swagger
 * /api/v1/change-password:
 *   patch:
 *     summary: Change user password
 *     tags:
 *       - Change Password
 *     requestBody:
 *       description: User data for changing password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       '400':
 *         description: Compare password invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid old password
 *       '401':
 *         description: Invalid user or not user authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Does not have access
 */
userRouter.patch(
  "/change-password",
  ErrorHandlerWrapper(handlers.changePasswordHandler),
);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       surnames:
 *                         type: string
 *                       email:
 *                         type: string
 *                       photoUrl:
 *                         type: string
 *       '500':
 *         description: Token required for accessing users data
 */

userRouter.get(
  "/users",
  ErrorHandlerWrapper(AuthorizationWrapper(handlers.getAllUsersHandler)),
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                 surnames:
 *                   type: string
 *                   description: The user's surnames
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 photoUrl:
 *                   type: string
 *                   description: The URL of the user's photo
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

userRouter.get(
  "/users/:id",
  ErrorHandlerWrapper(AuthorizationWrapper(handlers.getUserHandler)),
);

userRouter.patch(
  "/users/:id",
  ErrorHandlerWrapper(AuthorizationWrapper(handlers.updateUserHandler)),
);

userRouter.delete(
  "/users/:id",
  ErrorHandlerWrapper(AuthorizationWrapper(handlers.deleteUserHandler)),
);

userRouter.post(
  "/token/refresh-token",
  ErrorHandlerWrapper(handlers.refreshTokenHandler),
);

export { userRouter };
