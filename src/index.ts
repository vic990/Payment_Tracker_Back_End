import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import rolesRouter from "./routes/roles.route";

const app = express();
app.use(express.json());

const PORT = 3000;
app.use(cors());

app.use(rolesRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a SQL Server establecida");
  })
  .catch((error) => {
    console.log("❌ Error al conectar a la base de datos:", error);
  });

app.listen(3000, () => {
  console.log("servidor corriendo en en la compu");
});
