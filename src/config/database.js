const mysql = require("mysql2/promise");

const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || 3306;
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME || "clothing_exchange_db";
const connectionLimit = Number(process.env.DB_CONNECTION_LIMIT) || 10;

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit,
  queueLimit: 0,
});

const connectDB = async () => {
  const connection = await pool.getConnection();
  await connection.ping();
  connection.release();
  console.log("MySQL connected");
};

module.exports = {
  connectDB,
  pool,
};
