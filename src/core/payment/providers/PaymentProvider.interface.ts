export interface PaymentProviderInterface {
  createPayment(amount: number, currency: string): Promise<unknown>;
  verifyPayment(paymentId: string): Promise<boolean>;
}
