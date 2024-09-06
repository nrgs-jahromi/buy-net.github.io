import { ApiError, fetcher } from "../config";
import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { Discount, ProductDetailsResponse } from "../product/getProductDetail";

type ProductData = {
  barcode: string;
  name: string;
  price: string;
  stock: number | null;
  brand: null | string;
  primary_image_url: string | null;
  category_names: string[];
  discount: Discount;
};

export type CartItemT = {
  product: ProductData;
  quantity: number;
  total_price: number;
  total_price_with_discount: number;
};
type CartT = {
  items: CartItemT[];
  total_quantity: number;
  total_price: number;
  tax_percentage:string;

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
