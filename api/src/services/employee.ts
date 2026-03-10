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

type EmployeeInput = {
  name?: string;
  email?: string;
  age?: number;
  role?: string;
  location?: string;
};

const ensureEmployeeSchema = async () => {
  const response = await query("SELECT to_regclass('employee_details')");
  if (!response.rows[0]?.to_regclass) {
    await query(createRoleQuery);
    await query(crateLocationQuery);
    await query(createEmployeeTableQuery);
  }
};

export const getAllEmployeesService = async () => {
  await ensureEmployeeSchema();
  const { rows } = await query(getAllEmployeesQuery);
  return rows;
};

export const createEmployeeService = async (employee: EmployeeInput) => {
  const { name, email, age, role, location } = employee;

  if (!name || !email || age === undefined || age === null) {
    throw createError(400, "Name, email, and age are required");
  }

  const data = await query(createEmployeeQuery, [
    name,
    email,
    age,
    role,
    location,
  ]);
  return data.rows[0];
};

export const getEmployeeService = async (id: string) => {
  const { rows } = await query(getEmployeeQuery, [id]);
  if (rows.length === 0) {
    throw createError(404, "Employee not found");
  }

  return rows[0];
};

export const updateEmployeeService = async (
  id: string,
  employee: EmployeeInput,
) => {
  const { name, email, age, role, location } = employee;

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

  return rows[0];
};

export const deleteEmployeeService = async (id: string) => {
  const { rows } = await query(deleteEmployeeQuery, [id]);

  if (rows.length === 0) {
    throw createError(404, "Employee not found");
  }
};

export const EmployeeService = {
  getAll: getAllEmployeesService,
  create: createEmployeeService,
  get: getEmployeeService,
  update: updateEmployeeService,
  delete: deleteEmployeeService,
};
