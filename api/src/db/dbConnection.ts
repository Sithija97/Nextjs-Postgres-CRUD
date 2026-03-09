import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "PG_USER",
  "PG_HOST",
  "PG_DATABASE",
  "PG_PORT",
  "PG_PASSWORD",
];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName],
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
  process.exit(1);
}

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: parseInt(process.env.PG_PORT || "5432", 10),
  password: process.env.PG_PASSWORD,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => {
    console.error("Failed to connect to PostgreSQL database:", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client:", err);
  process.exit(1);
});

export const query = (text: string, params?: any[]) => db.query(text, params);

export default db;
