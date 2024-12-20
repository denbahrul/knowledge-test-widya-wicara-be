import { GenderEnum } from "@prisma/client";

export interface RegisterDTO {
  fullName: string;
  gender: GenderEnum;
  email: string;
  password: string;
  profilePhoto?: string;
}

export type LoginDTO = Pick<RegisterDTO, "email" | "password">;
