export type TOrderItem = {
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};
export type TPayment = {
  _id: string;
  orderId: string;
  amount: number;
  items: [TOrderItem];
  transactionId: string;
  paymentStatus: "UNPAID" | "PAID";
  orderStatus: "Pneding" | "Fake" | "Confirm" | "Canceled" | "Delivered";
  paymentType: "Cash On Delivery" | "Online Payment" | "Mobile Banking";
  paymentNumber?: string;
  paymentGetwayData?: JSON;
  createdAt: string;
};
