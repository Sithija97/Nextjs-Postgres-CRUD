import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/dbConnection.js"; // Import to initialize DB connection

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // Allow all origins (for development purposes)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to your TypeScript API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
