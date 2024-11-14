import {
  Cart,
  CartItem,
  Ingridient,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingridients: Ingridient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingridients?: number[];
}
