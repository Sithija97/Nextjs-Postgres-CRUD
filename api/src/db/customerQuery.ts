export const createCustomerTypeQuery = `
    CREATE TYPE customer_type AS
    ENUM ('Individual', 'Business', 'Enterprise', 'Partner', 'Reseller', 'Other');
`;

export const createCustomerTableQuery = `
    CREATE TABLE IF NOT EXISTS customer_details (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(50) NOT NULL,
        address TEXT NOT NULL DEFAULT '',
        country VARCHAR(100) NOT NULL DEFAULT '',
        customer_type customer_type NOT NULL DEFAULT 'Individual',
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export const getAllCustomersQuery = `
    SELECT * FROM customer_details ORDER BY date_created DESC;
`;

export const createCustomerQuery = `
    INSERT INTO customer_details (
        first_name, 
        last_name, 
        email, 
        phone_number, 
        address, 
        country, 
        customer_type
    )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        COALESCE($5, ''),
        COALESCE($6, ''),
        COALESCE($7::customer_type, 'Individual'::customer_type)
    )
    RETURNING *;
`;

export const getCustomerQuery = `
    SELECT * FROM customer_details WHERE id = $1;
`;

export const updateCustomerQuery = `
    UPDATE customer_details
    SET first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        phone_number = COALESCE($4, phone_number),
        address = COALESCE($5, address),
        country = COALESCE($6, country),
        customer_type = COALESCE($7::customer_type, customer_type),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *;
`;

export const deleteCustomerQuery = `
    DELETE FROM customer_details WHERE id = $1 RETURNING *;
`;
