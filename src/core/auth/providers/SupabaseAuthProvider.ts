import { AuthProviderInterface } from "./AuthProviderInterface";
export class SupabaseAuthProvider implements AuthProviderInterface {
  async signIn(credentials: unknown) { return null; }
  async signOut() {}
  async getSession() { return null; }
}
