import Joi from "joi";
import { LoginDTO, RegisterDTO } from "../../dto/user.dto";
import { GenderEnum } from "@prisma/client";

export const RegisterSchema = Joi.object<RegisterDTO>({
  fullName: Joi.string().required(),
  gender: Joi.string().valid(GenderEnum.Male, GenderEnum.Female),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
});

export const LoginSchema = Joi.object<LoginDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
