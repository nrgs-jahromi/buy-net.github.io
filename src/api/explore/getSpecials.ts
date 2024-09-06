import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type TopDiscountedProductsResponseT = {
  top_discounted_products: {
    product_barcode: number;
    image_url: string;
    discount_percentage: number;
  }[];
  expiring_soon_products: {
    product_barcode: number;
    image_url: string;
    expiration_date: string;
  }[];
};

type QueryKey = ["topDiscountedProducts", { store_id: string }];

const getTopDiscountedProducts: QueryFunction<TopDiscountedProductsResponseT, QueryKey> = async ({ queryKey }) => {
  const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<TopDiscountedProductsResponseT>(`/products/special/${store_id}/`);
  return dataRes;
};

export const useTopDiscountedProducts = (
  store_id: string,
  options?: UseQueryOptions<TopDiscountedProductsResponseT, ApiError, TopDiscountedProductsResponseT, QueryKey>
) => {
  return useQuery(["topDiscountedProducts", { store_id }], getTopDiscountedProducts, options);
};
