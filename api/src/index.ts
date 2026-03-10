import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/dbConnection.js"; // Import to initialize DB connection
import customerRoute from "./routes/customer.js"; // Import customer routes
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

const corsOptions = {
  origin: "*", // Allow all origins (for development purposes)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Customer Management API",
    version: "1.0.0",
    endpoints: {
      customers: "/api/customers",
    },
  });
});

app.use("/api/customers", customerRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
