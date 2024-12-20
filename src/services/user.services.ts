import { LoginDTO, RegisterDTO } from "../dto/user.dto";
import userRepositories from "../repositories/user.repositories";
import bcrypt from "bcrypt";

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
  async login(loginInfo: LoginDTO) {}
  async getUserProfile(userId: number) {}
}

export default new UserServices();
