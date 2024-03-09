import bcrypt from "bcryptjs";
import { User } from "../entities/user";
import { dataSource } from "../config";
import { JwtService } from "./shared/jwt.service";
import { cleanObject, CustomError } from "../utils";

export default class UserService extends JwtService {
  private static readonly repository = dataSource.getRepository(User);

  /**
   * Signup of user service
   */
  static signup = async ({ name, surnames, email, password, role }: User) => {
    try {
      const user = await this.getUserByEmail(email);
      if (user)
        throw new CustomError(
          "Oops seems like this email is already in use.",
          400,
        );

      const newUser = new User();
      newUser.name = name;
      newUser.surnames = surnames;
      newUser.email = email;
      newUser.password = password;
      newUser.role = role;

      const data = await this.repository.save(newUser);

      return {
        message: "User successfully registered",
        user: data,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Signup error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Login of user service
   */
  static login = async (email: string, password: string) => {
    try {
      if (!email || !password)
        throw new CustomError("Missing information", 400);

      const user = await this.getUserByEmail(email);

      if (!user) throw new CustomError("Does not have access", 401);

      if (!bcrypt.compareSync(password, user.password))
        throw new CustomError("Invalid password", 400);

      const accessToken = this.signToken(user.id);

      return {
        message: "Login successful",
        data: {
          name: user.name,
          surnames: user.surnames,
          email: user.email,
          token: accessToken,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Login access error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Change password of user service
   */
  static changePassword = async (
    email: string,
    oldPassword: string,
    newPassword: string,
  ) => {
    try {
      if (!email || !oldPassword || !newPassword)
        throw new CustomError("Missing information", 400);

      const user = await this.getUserByEmail(email);

      if (!user) throw new CustomError("Does not have access", 401);

      if (!bcrypt.compareSync(oldPassword, user.password))
        throw new CustomError("Invalid old password", 400);

      user.password = newPassword;
      await this.repository.save(user);

      return { message: "Password changed successfully" };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Change password error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Get users of user service
   */
  static getUsers = async () => {
    try {
      const users = await this.repository
        .createQueryBuilder("user")
        .select(["user.id", "user.email", "user.surnames", "user.photoUrl"])
        .where("user.deletedAt IS NULL")
        .getMany();

      return { users };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Get all users error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Update user of user service
   */
  static updateUser = async (id: string, { name }: Partial<User>) => {
    try {
      const { user } = await this.getUserById(id);

      if (!user) throw new CustomError("User not found", 404);

      await this.repository
        .createQueryBuilder()
        .update(User)
        .set(
          cleanObject({
            name,
          }),
        )
        .where("id = :id", { id })
        .execute();

      return { message: "User successfully updated" };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Update user error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Delete user of user service
   */
  static deleteUser = async (id: string) => {
    try {
      const { user } = await this.getUserById(id);

      if (!user) throw new CustomError("User not found", 404);

      await this.repository.softDelete(id);

      return { message: "User successfully deleted" };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Delete user error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Get user by id of user service
   */
  static getUserById = async (id: string) => {
    try {
      const user = await this.repository
        .createQueryBuilder("user")
        .select(["user.id", "user.email", "user.name", "user.photoUrl"])
        .where("user.deletedAt IS NULL AND user.id = :id", { id })
        .getOne();

      return { user };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Get user by id error, reason: ", error.message);
        throw error;
      }
    }
  };

  /**
   * Get user by email of user service
   */
  private static getUserByEmail = async (email: string) =>
    await this.repository.findOne({ where: { email } });
}
