import { ApiError, fetcher } from "../config";
import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { ProductDetailsResponse } from "../product/getProductDetail";

type CartItemT = {
  product: ProductDetailsResponse;
  quantity: number;
  total_price: number;
  total_price_with_discount: number;
};
type CartT = {
  items: CartItemT[];
  total_quantity: number;
  total_price: number;
};

type QueryKey = ["cart", { store_id: string }];

const getCart: QueryFunction<CartT, QueryKey> = async ({queryKey}) => {
    const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<CartT>(`/invoices/cart/${store_id}/`);
  return dataRes;
};

export const useCart = (
  store_id: string,
  options?: UseQueryOptions<CartT, ApiError, CartT, QueryKey>
) => {
  return useQuery(["cart", { store_id }], getCart, options);
};
