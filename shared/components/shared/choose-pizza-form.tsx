"use client";

import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Ingridient, ProductItem } from "@prisma/client";
import React from "react";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { IngridientItem } from "./ingridient-item";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

interface Props {
  imageUrl: string;
  name: string;
  ingridients: Ingridient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingridient: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingridients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngridients,
    availibleSizes,
    currentItemId,
    setSize,
    setType,
    addIngridients,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingridients,
    selectedIngridients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngridients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div className="w-[490px] bg-gray-200 p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availibleSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar my-5">
          <div className="grid grid-cols-3 gap-3">
            {ingridients.map((ingridient) => (
              <IngridientItem
                key={ingridient.id}
                name={ingridient.name}
                price={ingridient.price}
                imageUrl={ingridient.imageUrl}
                onClick={() => addIngridients(ingridient.id)}
                active={selectedIngridients.has(ingridient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
