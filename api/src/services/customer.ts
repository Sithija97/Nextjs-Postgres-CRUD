import { query } from "../db/dbConnection";
import {
  createCustomerTypeQuery,
  createCustomerTableQuery,
  getAllCustomersQuery,
  createCustomerQuery,
  getCustomerQuery,
  updateCustomerQuery,
  deleteCustomerQuery,
} from "../db/customerQuery";
import { createError } from "../utils/error";

type CustomerInput = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  country?: string;
  customer_type?: string;
};

const ensureCustomerSchema = async () => {
  const response = await query("SELECT to_regclass('customer_details')");
  if (!response.rows[0]?.to_regclass) {
    await query(createCustomerTypeQuery);
    await query(createCustomerTableQuery);
  }
};

export const getAllCustomersService = async () => {
  await ensureCustomerSchema();
  const { rows } = await query(getAllCustomersQuery);
  return rows;
};

export const createCustomerService = async (customer: CustomerInput) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    country,
    customer_type,
  } = customer;

  if (!first_name || !last_name || !email || !phone_number) {
    throw createError(
      400,
      "First name, last name, email, and phone number are required",
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError(400, "Invalid email format");
  }

  // Basic phone validation (allow numbers, spaces, hyphens, parentheses, plus)
  const phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(phone_number)) {
    throw createError(400, "Invalid phone number format");
  }

  const data = await query(createCustomerQuery, [
    first_name,
    last_name,
    email,
    phone_number,
    address,
    country,
    customer_type,
  ]);
  return data.rows[0];
};

export const getCustomerService = async (id: string) => {
  const { rows } = await query(getCustomerQuery, [id]);
  if (rows.length === 0) {
    throw createError(404, "Customer not found");
  }

  return rows[0];
};

export const updateCustomerService = async (
  id: string,
  customer: CustomerInput,
) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    country,
    customer_type,
  } = customer;

  // Validate email if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError(400, "Invalid email format");
    }
  }

  // Validate phone if provided
  if (phone_number) {
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(phone_number)) {
      throw createError(400, "Invalid phone number format");
    }
  }

  const { rows } = await query(updateCustomerQuery, [
    first_name,
    last_name,
    email,
    phone_number,
    address,
    country,
    customer_type,
    id,
  ]);

  if (rows.length === 0) {
    throw createError(404, "Customer not found");
  }

  return rows[0];
};

export const deleteCustomerService = async (id: string) => {
  const { rows } = await query(deleteCustomerQuery, [id]);

  if (rows.length === 0) {
    throw createError(404, "Customer not found");
  }
};

export const CustomerService = {
  getAll: getAllCustomersService,
  create: createCustomerService,
  get: getCustomerService,
  update: updateCustomerService,
  delete: deleteCustomerService,
};
