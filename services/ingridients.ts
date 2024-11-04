import { Ingridient } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export const getAll = async (): Promise<Ingridient[]> => {
  const { data } = await axiosInstance.get<Ingridient[]>(ApiRoutes.INGRIDIENTS);

  return data;
};
