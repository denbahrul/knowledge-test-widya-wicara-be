import { UpdateProfileDTO } from "../dto/profile.dto";
import { LoginDTO, RegisterDTO } from "../dto/user.dto";
import userRepositories from "../repositories/user.repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserServices {
  async register(registerInfo: RegisterDTO) {
    const existedUser = await userRepositories.findUserByEmail(registerInfo.email);

    if (existedUser) {
      throw {
        status: "fail",
        message: "Email already use",
      };
    }

    const hashedPassword = await bcrypt.hash(registerInfo.password, 10);

    const { password, ...createdUser } = await userRepositories.createUser({
      ...registerInfo,
      password: hashedPassword,
    });

    return createdUser;
  }
  async login(loginInfo: LoginDTO) {
    const user = await userRepositories.findUserByEmail(loginInfo.email);

    if (!user) {
      throw {
        status: "fail",
        message: "Incorrect Email / Password",
      };
    }

    const isPasswordValid = await bcrypt.compare(loginInfo.password, user.password);

    if (!isPasswordValid) {
      throw {
        status: "fail",
        message: "Incorrect Email / Password",
      };
    }

    const { password, ...userToSign } = user;
    const screetKey = process.env.JWT_SCREET_KEY as string;
    const accessToken = jwt.sign(userToSign, screetKey);

    return {
      user: userToSign,
      accessToken,
    };
  }

  async getUserLogged(userId: number) {
    const user = await userRepositories.findUserById(userId);

    if (!user) {
      throw {
        status: "fail",
        message: "Invalid user token",
      };
    }

    return user;
  }

  async getUserProfile(userId: number) {
    return await userRepositories.findUserById(userId);
  }

  async updateProfile(userId: number, body: UpdateProfileDTO) {
    return await userRepositories.update(userId, body);
  }
}

export default new UserServices();
