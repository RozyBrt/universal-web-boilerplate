import { AuthProviderInterface } from "./AuthProviderInterface";
export class NextAuthProvider implements AuthProviderInterface {
  async signIn(credentials: unknown) { return null; }
  async signUp(credentials: unknown) { return null; }
  async signOut() {}
  async getSession() { return null; }
}
