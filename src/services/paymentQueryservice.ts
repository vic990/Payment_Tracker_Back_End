import { PaymentQueryRepository } from "../repositories/paymentsQuery.repository";
import { UserPaymentResponseDTO } from "../dto/paymentsResponse.dto";

export class PaymentQueryService {
  private paymentsQueryRepository = new PaymentQueryRepository();

  constructor() {
    this.paymentsQueryRepository = new PaymentQueryRepository();
  }

  async getUserPayments(userId: number): Promise<{
    success: boolean;
    userPaymentResponse?: UserPaymentResponseDTO | null;
  }> {
    const [own, onBehalf] = await Promise.all([
      this.paymentsQueryRepository.getOwnPayment(userId),
      this.paymentsQueryRepository.getPaymentsOnBehalf(userId),
    ]);

    return {
      success: true,
      userPaymentResponse: {
        own,
        onBehalf,
      },
    };
  }
}
