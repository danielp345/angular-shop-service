export interface CartProduct {
  productId: string;
  userId: string;
  title: string;
  amount: number;
  priceOfProduct: number;
}

export interface CartProductWithId {
  _id: string;
  productId: string;
  userId: string;
  title: string;
  amount: number;
  priceOfProduct: number;
}
