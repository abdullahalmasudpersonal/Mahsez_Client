export type TOrderItem = {
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type TOrder = {
  orderId: string;
  userId: string;
  email: string;
  name: string;
  district: string;
  contactNumber: string;
  address: string;
  comment?: string;
  items: [TOrderItem];
  orderStatus: "Pneding" | "Fake" | "Confirm" | "Canceled" | "Delivered";
  paymentType: "Cash On Delivery" | "Online Payment" | "Mobile Banking";
  paymentNumber?: string;
  paymentStatus: "UNPAID" | "PAID";
  deliveryCharge: number;
  subTotal: number;
  grandTotal: number;
  isDeleted: boolean;
};
