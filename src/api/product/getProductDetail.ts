import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../config";
type Discount = {
  discount_percentage: number | null;
  expiration_date: string | null;
  min_quantity_for_discount: number | null;
};

export type ProductDetailsResponse = {
  barcode: string;
  name: string;
  price: string;
  stock: number | null;
  reserved_stock: number | null;
  min_stock: number | null;
  brand: string | null;
  location: string | null;
  description: string | null;
  store: number | null;
  discount: Discount | null;
  categories: string[];
  primary_image: string | null;
  images: { id: number; image: string; is_primary: boolean }[];
};

const getProductDetails = async (store_id: string, barcode: string) => {
  const { data } = await fetcher.get<ProductDetailsResponse>(
    `/products/info/${store_id}/${barcode}/`
  );
  return data;
};

export const useProductDetails = (store_id: string, barcode: string) => {
  return useQuery<ProductDetailsResponse>(
    ["getProductDetails", store_id, barcode],
    () => getProductDetails(store_id, barcode)
  );
};
