import { UpdateProfileDTO } from "../dto/profile.dto";
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
      select: {
        id: true,
        email: true,
        fullName: true,
        gender: true,
        profilePhoto: true,
      },
    });
  }

  async update(userId: number, data: UpdateProfileDTO) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      select: {
        id: true,
        fullName: true,
        gender: true,
        email: true,
        profilePhoto: true,
      },
    });
  }
}

export default new UserRepositories();
