export class BaseApiClient {
  constructor(private baseUrl: string) {}
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    return res.json();
  }
  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST", body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  }
}
