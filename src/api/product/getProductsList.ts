import {
  useQuery,
  QueryFunction,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DataT = {
  store_id: string;
  params: {
    q?: string;
  };
};

export type ProductData = {
  barcode: string;
  name: string;
  price: string;
  stock: number | null;
  brand: null | string;
  primary_image_url: string | null;
  category_names: string[];
  discount: number;
};

type ResT =  ProductData[];


type QueryKey = ["products", DataT];

const fetchProducts: QueryFunction<ResT, QueryKey> = async ({ queryKey }) => {
  const { store_id, params } = queryKey[1];
  const { q = "" } = params;
  const { data: dataRes } = await fetcher.get<ResT>(`/products/search/${store_id}`, {
    params: { q },
  });
  return dataRes;
};

export const useProducts = (
  data: DataT,
  options:
    | UseQueryOptions<ResT, ApiError, ResT, QueryKey>
    | undefined = undefined
) => {
  return useQuery<ResT, ApiError, ResT, QueryKey>(
    ["products", data],
    fetchProducts,
    options
  );
};
