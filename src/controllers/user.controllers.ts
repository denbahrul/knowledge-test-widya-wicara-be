import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../dto/user.dto";
import userServices from "../services/user.services";
import { LoginSchema, RegisterSchema, UpdateProfileSchema } from "../utils/schemas/user.schema";
import { UpdateProfileDTO } from "../dto/profile.dto";
import cloudinaryServices from "../services/cloudinary.services";

class UserControllers {
  async register(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/registerSchema"
                    }  
                }
            }
        } 
    */
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
    // #swagger.tags = ['Auth']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSchema"
                    }  
                }
            }
        } 
    */
    try {
      const loginBody = await LoginSchema.validateAsync(req.body as LoginDTO);
      const data = await userServices.login(loginBody);
      res.json({
        message: "User logged succesfully",
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

  async getUserLogged(req: Request, res: Response) {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Get user logged in'
    try {
      const user = res.locals.user;
      const data = await userServices.getUserLogged(user.id);
      res.json({
        ...data,
      });
    } catch (error) {
      console.log(error);
      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async getUserProfile(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get profile user'
    try {
      const user = res.locals.user;
      const data = await userServices.getUserLogged(user.id);
      res.json({
        ...data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update User'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/updateUserSchema"
                        }  
                    }
                }
            } 
      */
    try {
      const user = res.locals.user;
      const body: UpdateProfileDTO = req.body;
      const fileUpload = req.file;

      if (fileUpload) {
        const image = await cloudinaryServices.upload(fileUpload as Express.Multer.File);
        body.profilePhoto = image.secure_url;
      }

      const value = await UpdateProfileSchema.validateAsync(body);
      const data = await userServices.updateProfile(user.id, value);
      res.json({
        message: "Profile was updated",
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
}

export default new UserControllers();
