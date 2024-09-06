import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

// تعریف نوع داده‌های مربوط به محصولات پیشنهادی
type RecommendedProductT = {
  product_id: number;
  product_name: string;
  image_url: string;
};

type QueryKey = ["recommendedProducts", { store_id: string }];

// به‌روزرسانی تابع برای دریافت لیست پیشنهادات
const getRecommendedProducts: QueryFunction<RecommendedProductT[], QueryKey> = async ({ queryKey }) => {
  const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<{ recommended_products: RecommendedProductT[] }>(`/customers/recommend-products/${store_id}/`);
  return dataRes.recommended_products;
};

// هوک استفاده از لیست پیشنهادات
export const useRecommendedProducts = (
  store_id: string,
  options?: UseQueryOptions<RecommendedProductT[], ApiError, RecommendedProductT[], QueryKey>
) => {
  return useQuery(["recommendedProducts", { store_id }], getRecommendedProducts, options);
};
