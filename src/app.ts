import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.route";
import loginRoutes from "./routes/login.route";
import paymentRoutes from "./routes/payments.route";
import paymentsListRoutes from "./routes/paymentsQuery.route";

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
app.use("/", paymentRoutes);
app.use("/", paymentsListRoutes);

export default app;
