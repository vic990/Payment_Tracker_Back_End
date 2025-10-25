import { Request, Response } from "express";
import { PaymentsService } from "../services/paymentsService";
import { jsonResponse } from "../lib/jsonResponse";

export class PaymentsController {
  private paymentService: PaymentsService;

  constructor() {
    this.paymentService = new PaymentsService();
  }

  createPayment = async (req: Request, res: Response): Promise<void> => {
    const { amount, paid_by_user_id, paid_on_behalf_of_user_id } = req.body;
    try {
      if (
        isNaN(amount) ||
        isNaN(paid_by_user_id) ||
        isNaN(paid_on_behalf_of_user_id)
      ) {
        res.status(400).json(
          jsonResponse(404, {
            message: "Ocurrio un error",
          })
        );
      }
      if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json(
          jsonResponse(400, {
            message: "No se proporcionaron datos para el pago",
          })
        );
      }

      const result = await this.paymentService.createPayment(req.body);

      if (!result.success) {
        res.status(400).json(
          jsonResponse(400, {
            message: result.message,
          })
        );
      }

      res.status(200).json(
        jsonResponse(200, {
          message: result.message,
        })
      );
    } catch (error) {
      res.status(500).json(
        jsonResponse(500, {
          message: "Error conectando al servidor",
        })
      );
    }
  };
}
