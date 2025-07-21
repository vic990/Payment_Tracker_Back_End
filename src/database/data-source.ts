import { DataSource } from "typeorm";
import "reflect-metadata";
import sql from "mssql";
require("dotenv").config();
// import dotenv from "dotenv";

// dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "1433"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + "/../entities/*.ts"],
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
