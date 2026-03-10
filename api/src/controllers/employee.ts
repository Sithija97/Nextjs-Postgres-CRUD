import { Request, Response, NextFunction } from "express";
import { EmployeeService } from "../services/employee";

type EmployeeParams = { id: string };
type EmployeeBody = {
  name?: string;
  email?: string;
  age?: number;
  role?: string;
  university?: string;
  location?: string;
  address?: string;
};

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employees = await EmployeeService.getAll();
    res.status(200).json(employees);
  } catch (error) {
    return next(error);
  }
};

export const createEmployee = async (
  req: Request<Record<string, never>, unknown, EmployeeBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await EmployeeService.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    return next(error);
  }
};

export const getEmployee = async (
  req: Request<EmployeeParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await EmployeeService.get(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    return next(error);
  }
};

export const updateEmployee = async (
  req: Request<EmployeeParams, unknown, EmployeeBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await EmployeeService.update(req.params.id, req.body);
    res.status(200).json(employee);
  } catch (error) {
    return next(error);
  }
};

export const deleteEmployee = async (
  req: Request<EmployeeParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await EmployeeService.delete(req.params.id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
