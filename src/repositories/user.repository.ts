import { AppDataSource } from "../database/data-source";
import { Users } from "../entities/user";
import { Repository } from "typeorm";

export class UserRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = AppDataSource.getRepository(Users);
  }

  async findAll(): Promise<Users[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Users | null> {
    return this.repository.findOne({ where: { user_id: id } });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(userData: Users): Promise<Users> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async update(id: number, userData: Partial<Users>): Promise<Users | null> {
    const user = await this.findById(id);

    if (!user) return null;

    this.repository.merge(user, userData);
    return this.repository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);

    return result.affected !== 0;
  }

  async emailExist(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);

    return !!user;
  }
}
