import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingridients.reduce(
    (acc, ingridient) => acc + ingridient.price,
    0
  );

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
