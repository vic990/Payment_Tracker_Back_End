import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.route";
import loginRoutes from "./routes/login.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use("/", userRoutes);
app.use("/", loginRoutes);

export default app;
