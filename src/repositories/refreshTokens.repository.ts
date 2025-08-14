import { AppDataSource } from "../database/data-source";
import { refresh_tokens } from "../entities/refreshTokens";
import { Repository } from "typeorm";

export class RefreshTokensRepository {
  private repository: Repository<refresh_tokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(refresh_tokens);
  }

  async findUserId(user_id: number): Promise<refresh_tokens | null> {
    return this.repository.findOne({ where: { user_id: user_id } });
  }

  async findId(id: number): Promise<refresh_tokens | null> {
    return this.repository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    refresh_token: Partial<refresh_tokens>
  ): Promise<refresh_tokens | null> {
    const token = await this.findId(id);

    if (!token) return null;

    this.repository.merge(token, refresh_token);

    return this.repository.save(token);
  }
}
