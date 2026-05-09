import { DatabaseAdapterInterface } from "./DatabaseAdapter.interface";
export class SupabaseAdapter implements DatabaseAdapterInterface {
  async connect() {}
  async disconnect() {}
  async query<T>(_sql: string, _params?: unknown[]): Promise<T[]> { return []; }
}
