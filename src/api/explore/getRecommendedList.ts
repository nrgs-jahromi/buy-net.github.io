import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type ProductT = {
  barcode: string;
  name: string;
  price: number;
  stock: number;
  brand: string | null;
  primary_image_url: string | null;
  category_names: string[];
  discount: {
    discount_percentage: number;
    expiration_date: string | null;
    min_quantity_for_discount: number;
  };
};

type QueryKey = ["recommendedProducts", { store_id: string }];

const getRecommendedProducts: QueryFunction<ProductT[], QueryKey> = async ({ queryKey }) => {
  const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<ProductT[]>(`/customers/recommend-products/${store_id}/`);
  return dataRes;
};

export const useRecommendedProducts = (
  store_id: string,
  options?: UseQueryOptions<ProductT[], ApiError, ProductT[], QueryKey>
) => {
  return useQuery(["recommendedProducts", { store_id }], getRecommendedProducts, options);
};
