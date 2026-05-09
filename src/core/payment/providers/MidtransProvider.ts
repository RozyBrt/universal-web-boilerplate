import { PaymentProviderInterface } from "./PaymentProvider.interface";
export class MidtransProvider implements PaymentProviderInterface {
  async createPayment(_amount: number, _currency: string) { return {}; }
  async verifyPayment(_id: string) { return true; }
}
