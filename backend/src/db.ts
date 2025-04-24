import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "focusflow_user",
  host: process.env.DB_HOST || "localhost", // Use "postgres" if running in Docker Compose
  database: process.env.DB_NAME || "focusflow_db",
  password: process.env.DB_PASS || "supersecurepassword",
  port: parseInt(process.env.DB_PORT || "5432", 10), // Default PostgreSQL port
});

export default pool;