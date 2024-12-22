import { GenderEnum } from "@prisma/client";

export interface UpdateProfileDTO {
  fullName: string;
  gender: GenderEnum;
  email: string;
  profilePhoto?: string;
}
