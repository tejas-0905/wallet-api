import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Creates SQL connection using DATABASE_URL env var
const sql = neon(process.env.DATABASE_URL ?? "");

export default sql;  // Default export: import db from './db.js';
export { sql };      // Named export: import { sql } from './db.js';

// Initialize database schema
export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `;
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
    process.exit(1);
  }
}
