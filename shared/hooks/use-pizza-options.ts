import { ProductItem } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { getAvailiblePizzaSizes } from "../lib";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngridients: Set<number>;
  availibleSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngridients: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngridients, { toggle: addIngridients }] = useSet(
    new Set<number>([])
  );

  const availibleSizes = getAvailiblePizzaSizes(items, type);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  React.useEffect(() => {
    const isAvailibleSize = availibleSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availibleSize = availibleSizes?.find((item) => !item.disabled);

    if (!isAvailibleSize && availibleSize) {
      setSize(Number(availibleSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngridients,
    availibleSizes,
    currentItemId,
    setSize,
    setType,
    addIngridients,
  };
};
