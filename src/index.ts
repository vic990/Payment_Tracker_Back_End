// index.ts
import app from "./app";
import { AppDataSource } from "./database/data-source";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a SQL Server establecida");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a la base de datos:", error);
  });
