import { Api } from "@/shared/services/api-client";
import { Ingridient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngridients] = React.useState<Ingridient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIngridients() {
      try {
        setLoading(true);
        const response = await Api.ingridients.getAll();
        setIngridients(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngridients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
