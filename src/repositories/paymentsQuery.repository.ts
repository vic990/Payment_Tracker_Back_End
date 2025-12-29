import { AppDataSource } from "../database/data-source";
import { OwnPaymentDTO, PaymentOnBehalfDTO } from "../dto/paymentQuery.dto";

export class PaymentQueryRepository {
  async getOwnPayment(userid: number): Promise<OwnPaymentDTO[]> {
    return AppDataSource.query("SELECT * FROM fn_own_payments(@0)", [userid]);
  }

  async getPaymentsOnBehalf(userid: number): Promise<PaymentOnBehalfDTO[]> {
    return AppDataSource.query("SELECT * FROM fn_payments_on_behalf(@0)", [
      userid,
    ]);
  }
}
