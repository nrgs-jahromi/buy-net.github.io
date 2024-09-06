import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

export type ProductT = {
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

type TopDiscountedProductsResponseT = {
  top_discounted_products: ProductT[];
  expiring_soon_products: ProductT[];
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
