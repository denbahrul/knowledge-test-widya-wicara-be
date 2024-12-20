import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to TECH SPACE API, this API is for Widya Wicara Knowledge Test");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
