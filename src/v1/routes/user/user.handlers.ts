import { Request, Response } from "express";
import { UserService } from "../../../services";
import { User } from "../../../entities/user";

export const signupHandler = async (req: Request, res: Response) => {
  const data = req.body || {};

  const result = await UserService.signup(<User>data);
  res.status(200).json(result);
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  const result = await UserService.login(email, password);

  res.status(200).json(result);
};

export const changePasswordHandler = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body || {};

  const result = await UserService.changePassword(
    email,
    oldPassword,
    newPassword,
  );

  res.status(200).json(result);
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  const result = await UserService.getUsers();

  res.status(200).json(result);
};

export const getUserHandler = async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await UserService.getUserById(id);

  res.status(200).json(result);
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const id = req.params?.id;
  const data = req.body || {};

  const result = await UserService.updateUser(id, <Partial<User>>data);

  res.status(200).json(result);
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await UserService.deleteUser(id);

  res.status(200).json(result);
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = req.body || {};
  const result = await UserService.refreshToken(refreshToken);

  res.status(200).json(result);
};
