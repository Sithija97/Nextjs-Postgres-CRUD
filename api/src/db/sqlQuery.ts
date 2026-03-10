import { getAllEmployees } from "./../controllers/employee";
export const createRoleQuery = `
    CREATE TYPE role_type AS
    ENUM ('Manager', 'Developer', 'HR', 'Sales', 'Marketing', 'Intern', 'Other');
`;

export const crateLocationQuery = `
    CREATE TYPE location_type AS
    ENUM ('Onsite', 'Hybrid', 'Remote');
`;

export const createEmployeeTableQuery = `
    CREATE TABLE IF NOT EXISTS employee_details (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age SMALLINT NOT NULL CHECK (age > 17),
        role role_type NOT NULL DEFAULT 'Other',
        location location_type NOT NULL DEFAULT 'Onsite',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export const getAllEmployeesQuery = `SELECT * FROM employee_details;`;

export const createEmployeeQuery = `
    INSERT INTO employee_details (name, email, age, role, location)
    VALUES ($1, $2, $3, COALESCE($4::role_type, 'Other' ::role_type), COALESCE($5::location_type, 'Onsite' ::location_type))
    RETURNING *;
`;

export const getEmployeeQuery = `SELECT * FROM employee_details WHERE id = $1;`;

export const updateEmployeeQuery = `
    UPDATE employee_details
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        age = COALESCE($3, age),
        role = COALESCE($4::role_type, role),
        location = COALESCE($5::location_type, location),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *;
`;

export const deleteEmployeeQuery = `DELETE FROM employee_details WHERE id = $1 RETURNING *;`;
