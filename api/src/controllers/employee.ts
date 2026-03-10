import { Request, Response, NextFunction } from "express";
import { query } from "../db/dbConnection";
import {
  crateLocationQuery,
  createEmployeeQuery,
  createEmployeeTableQuery,
  createRoleQuery,
  deleteEmployeeQuery,
  getAllEmployeesQuery,
  getEmployeeQuery,
  updateEmployeeQuery,
} from "../db/sqlQuery";
import { createError } from "../utils/error";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await query("SELECT to_regclass('employee_details')");
    if (!response.rows[0].to_regclass) {
      await query(createRoleQuery);
      await query(crateLocationQuery);
      await query(createEmployeeTableQuery);
    }

    const { rows } = await query(getAllEmployeesQuery);
    res.status(200).json(rows);
  } catch (error) {
    return next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, age, role, location } = req.body;

    if (!name || !email || !age) {
      throw createError(400, "Name, email, and age are required");
    }

    const data = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      location,
    ]);
    res.status(201).json(data.rows[0]);
  } catch (error) {
    return next(error);
  }
};

export const getEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { rows } = await query(getEmployeeQuery, [id]);
    if (rows.length === 0) {
      throw createError(404, "Employee not found");
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    return next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { name, email, age, role, location } = req.body;

    const { rows } = await query(updateEmployeeQuery, [
      name,
      email,
      age,
      role,
      location,
      id,
    ]);

    if (rows.length === 0) {
      throw createError(404, "Employee not found");
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { rows } = await query(deleteEmployeeQuery, [id]);

    if (rows.length === 0) {
      throw createError(404, "Employee not found");
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
