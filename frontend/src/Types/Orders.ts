export interface OrderData {
    _id?:string,
    userId: string;
    customer: {
      name: string;
      email: string;
      address: string;
      phoneNumber: string;
    };
    orderDate: Date;
    orderItems: {
      bookId: string;
      title: string;
      quantity: number;
      price: number;
      sellerId: string;
      orderStatus: string;
    }[];
    totalAmount: number;
    payment: {
      paymentId: string;
      status: string;
      transactionId: string;
    };
    shipping: {
      method: string;
      address: string;
    };
    notes: string;
  }
  