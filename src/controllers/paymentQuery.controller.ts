import { Request, Response } from "express";
import { PaymentQueryService } from "../services/paymentQueryservice";
import { jsonResponse } from "../lib/jsonResponse";

export class PaymentQueryController {
  private paymentQueryService: PaymentQueryService;

  constructor() {
    this.paymentQueryService = new PaymentQueryService();
  }

  getPaymentUserPayments = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);
      const userPayments = await this.paymentQueryService.getUserPayments(
        userId
      );

      res.status(200).json(
        jsonResponse(200, {
          data: userPayments.userPaymentResponse,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error interno del servidor",
          error: error,
        })
      );
    }
  };
}
