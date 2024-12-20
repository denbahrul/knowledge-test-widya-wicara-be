import { Request, Response } from "express";
import { RegisterDTO } from "../dto/user.dto";
import userServices from "../services/user.services";
import { RegisterSchema } from "../utils/schemas/user.schema";

class UserControllers {
  async register(req: Request, res: Response) {
    try {
      const registerBody = req.body as RegisterDTO;
      const value = await RegisterSchema.validateAsync(registerBody);
      console.log(registerBody);

      const data = await userServices.register(value);
      res.json({
        message: "User created",
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
  async login(req: Request, res: Response) {
    try {
      res.json({});
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
  async getUserProfile(req: Request, res: Response) {
    try {
      res.json({});
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new UserControllers();
