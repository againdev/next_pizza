import { Ingridient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingridients - список ингридиентов
 * @param selectedIngredients - выбранные ингридиенты
 * @returns {number} общую стоимость
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingridients: Ingridient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const totalIngridientsPrice = ingridients
    .filter((ingridient) => selectedIngredients.has(ingridient.id))
    .reduce((acc, ingridient) => acc + ingridient.price, 0);

  return pizzaPrice + totalIngridientsPrice;
};
