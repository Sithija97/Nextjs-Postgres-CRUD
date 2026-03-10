import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../services/customer";

type CustomerParams = { id: string };
type CustomerBody = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  country?: string;
  customer_type?: string;
};

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customers = await CustomerService.getAll();
    res.status(200).json(customers);
  } catch (error) {
    return next(error);
  }
};

export const createCustomer = async (
  req: Request<Record<string, never>, unknown, CustomerBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customer = await CustomerService.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    return next(error);
  }
};

export const getCustomer = async (
  req: Request<CustomerParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customer = await CustomerService.get(req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    return next(error);
  }
};

export const updateCustomer = async (
  req: Request<CustomerParams, unknown, CustomerBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customer = await CustomerService.update(req.params.id, req.body);
    res.status(200).json(customer);
  } catch (error) {
    return next(error);
  }
};

export const deleteCustomer = async (
  req: Request<CustomerParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CustomerService.delete(req.params.id);

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
