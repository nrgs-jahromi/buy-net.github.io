import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type CategoryT = {
  id: number;
  name: string;
};

type QueryKey = ["categories", { store_id: string }];

const getCategories: QueryFunction<CategoryT[], QueryKey> = async ({ queryKey }) => {
  const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<CategoryT[]>(`/stores/category/${store_id}/`);
  return dataRes;
};

export const useCategories = (
  store_id: string,
  options?: UseQueryOptions<CategoryT[], ApiError, CategoryT[], QueryKey>
) => {
  return useQuery(["categories", { store_id }], getCategories, options);
};
