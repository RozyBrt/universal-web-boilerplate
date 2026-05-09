import { PaymentProviderInterface } from "./PaymentProvider.interface";
export class StripeProvider implements PaymentProviderInterface {
  async createPayment(_amount: number, _currency: string) { return {}; }
  async verifyPayment(_id: string) { return true; }
}
