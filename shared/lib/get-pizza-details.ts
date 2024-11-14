import { Ingridient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingridients: Ingridient[],
  selectedIngridients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingridients,
    selectedIngridients
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  return { totalPrice, textDetails };
};
