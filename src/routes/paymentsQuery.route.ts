import { Router } from "express";
import { PaymentQueryController } from "../controllers/paymentQuery.controller";

const route = Router();
const paymentQueryController = new PaymentQueryController();

route.post("/paymentQuery/:id", paymentQueryController.getPaymentUserPayments);

export default route;
