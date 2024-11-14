"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import React from "react";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { Title } from "./title";

interface Props {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  catedoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  catedoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(catedoryId);
    }
  }, [catedoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingridients={product.ingridients}
          />
        ))}
      </div>
    </div>
  );
};
