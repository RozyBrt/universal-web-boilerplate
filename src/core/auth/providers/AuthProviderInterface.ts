export interface AuthProviderInterface {
  signIn(credentials: unknown): Promise<unknown>;
  signOut(): Promise<void>;
  getSession(): Promise<unknown>;
}
