import { DataSource } from "typeorm";
import "reflect-metadata";
import sql from "mssql";
require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "1433"),
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  synchronize: false,
  entities: [__dirname + "/..entities/*.ts"],
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});

export const getconnection = async () => {
  try {
    const pool = await sql.getconnection(AppDataSource);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

// export const con = AppDataSource.initialize()
//   .then(() => {
//     console.log("✅ Conexión a SQL Server establecida");
//   })
//   .catch((error) => {
//     console.log("❌ Error al conectar a la base de datos:", error);
//   });
