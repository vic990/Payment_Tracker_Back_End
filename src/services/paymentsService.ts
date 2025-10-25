import { PaymentsRepository } from "../repositories/payments.repository";
import { Payments } from "../entities/payments";

export class PaymentsService {
  private paymentsRepository: PaymentsRepository;

  constructor() {
    this.paymentsRepository = new PaymentsRepository();
  }

  async createPayment(
    paymentData: Payments
  ): Promise<{ success: boolean; message: string; payment?: Payments }> {
    try {
      if (!Payments || !this.validatePaymentData(paymentData)) {
        return {
          success: false,
          message: "Datos del pago inválidos o incompletos",
        };
      }

      const newPayment = await this.paymentsRepository.create(paymentData);

      if (!newPayment) {
        return {
          success: false,
          message: "No se pudo procesar el pago",
        };
      }

      return {
        success: true,
        message: "Pago realizado exitosamente",
      };
    } catch (error) {
      console.error("Error al crear el pago", error);

      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error al realizar el pago",
      };
    }
  }

  private validatePaymentData(payment: Payments): boolean {
    return !!(payment.amount && payment.amount > 0 && payment.paid_by_user_id);
  }
}
