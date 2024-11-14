import { Ingridient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingridients: Ingridient[];
};
