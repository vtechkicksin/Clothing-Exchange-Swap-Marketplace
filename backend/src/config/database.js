const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "clothing_exchange_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",

    pool: {
      max: Number(process.env.DB_CONNECTION_LIMIT) || 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error.message);
    throw error;
  }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;


// const mysql = require("mysql2/promise");

// const host = process.env.DB_HOST || "127.0.0.1";
// const port = process.env.DB_PORT || 3306;
// const user = process.env.DB_USER || "root";
// const password = process.env.DB_PASSWORD || "";
// const database = process.env.DB_NAME || "clothing_exchange_db";
// const connectionLimit = Number(process.env.DB_CONNECTION_LIMIT) || 10;

// const pool = mysql.createPool({
//   host,
//   port,
//   user,
//   password,
//   database,
//   waitForConnections: true,
//   connectionLimit,
//   queueLimit: 0,
// });

// const connectDB = async () => {
//   const connection = await pool.getConnection();
//   await connection.ping();
//   connection.release();
//   console.log("MySQL connected");
// };

// module.exports = {
//   connectDB,
//   pool,
// };
