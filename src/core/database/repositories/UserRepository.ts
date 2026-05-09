import { BaseRepository } from "./BaseRepository";
import type { User } from "@/core/auth/types";
export class UserRepository extends BaseRepository<User> {
  async findById(_id: string) { return null; }
  async findAll() { return []; }
  async create(data: Partial<User>) { return data as User; }
  async update(_id: string, data: Partial<User>) { return data as User; }
  async delete(_id: string) {}
}
