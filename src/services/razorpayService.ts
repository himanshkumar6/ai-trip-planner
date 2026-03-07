export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface CreateOrderParams {
  amount: number;
  currency: string;
  tripId: string;
}

export const createRazorpayOrder = async (params: CreateOrderParams): Promise<any> => {
  // Mock order creation since we are in a serverless frontend-only setup
  // In production, this MUST hit a secure backend (e.g. Firebase Cloud Function) to avoid exposing keys
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `order_MOCK_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
        amount: params.amount * 100, // Razorpay works in sub-units (paise/cents)
        currency: params.currency
      });
    }, 1000); // Simulate network delay
  });
};

export const verifyPayment = async (response: any): Promise<boolean> => {
  // Mock payment verification
  // In production, verify the Razorpay signature on the backend before confirming
  console.log('Verifying Razorpay signature for:', response);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Always verify correctly in this mock
    }, 500);
  });
};
