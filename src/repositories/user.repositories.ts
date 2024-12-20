import { RegisterDTO } from "../dto/user.dto";
import { prisma } from "../libs/prisma";

class UserRepositories {
  async createUser(data: RegisterDTO) {
    return await prisma.user.create({
      data,
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(userId: number) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}

export default new UserRepositories();
