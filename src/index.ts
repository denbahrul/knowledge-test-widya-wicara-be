import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger-output.json";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to TECH SPACE API, this API is for Widya Wicara Knowledge Test");
});

app.use("/api/v1", router);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  })
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
