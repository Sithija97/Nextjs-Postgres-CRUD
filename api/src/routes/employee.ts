import express from "express";
import {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee";

const router = express.Router();

router
  .get("/", getAllEmployees)
  .post("/", createEmployee)
  .get("/:id", getEmployee)
  .put("/:id", updateEmployee)
  .delete("/:id", deleteEmployee);

export default router;
