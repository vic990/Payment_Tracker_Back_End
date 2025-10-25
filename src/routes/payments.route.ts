import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller";

const route = Router();
const paymentController = new PaymentsController();

route.post("/payment", paymentController.createPayment);

export default route;
