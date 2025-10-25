import { AppDataSource } from "../database/data-source";
import { Payments } from "../entities/payments";
import { Repository } from "typeorm";

export class PaymentsRepository {
  private repository: Repository<Payments>;

  constructor() {
    this.repository = AppDataSource.getRepository(Payments);
  }

  async findAll(): Promise<Payments[]> {
    return this.repository.find();
  }

  async create(paymentData: Payments): Promise<Payments> {
    const payment = this.repository.create(paymentData);
    return this.repository.save(payment);
  }
}
