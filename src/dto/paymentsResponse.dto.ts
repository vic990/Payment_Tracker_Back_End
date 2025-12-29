import { PaymentDTO } from "./paymentQuery.dto";

export interface UserPaymentResponseDTO {
  own: PaymentDTO[];
  onBehalf: PaymentDTO[];
}
