import express from "express";
import {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer";

const router = express.Router();

router
  .get("/", getAllCustomers)
  .post("/", createCustomer)
  .get("/:id", getCustomer)
  .put("/:id", updateCustomer)
  .delete("/:id", deleteCustomer);

export default router;
