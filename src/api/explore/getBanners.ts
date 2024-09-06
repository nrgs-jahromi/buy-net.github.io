import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type BannerT = {
  product_barcode: number;
  image_url: string;
};

type QueryKey = ["banners", { store_id: string }];

const getBanners: QueryFunction<BannerT[], QueryKey> = async ({ queryKey }) => {
  const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<BannerT[]>(`/stores/banners/${store_id}/`);
  return dataRes;
};

export const useBanners = (
  store_id: string,
  options?: UseQueryOptions<BannerT[], ApiError, BannerT[], QueryKey>
) => {
  return useQuery(["banners", { store_id }], getBanners, options);
};
