import { ApiError, fetcher } from "../config";
import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

type PurchaseSummaryT = {
  store_count: number;
  total_purchase_amount: number;
  total_purchases: number;
};

type QueryKey = ["PurchaseSummary"];

const getPurchaseSummary: QueryFunction<PurchaseSummaryT, QueryKey> = async (
  key
) => {
  const { data: dataRes } = await fetcher.get<PurchaseSummaryT>(
    "/customers/purchase-history/"
  );
  return dataRes;
};

export const usePurchaseSummary = (
  options?: UseQueryOptions<
    PurchaseSummaryT,
    ApiError,
    PurchaseSummaryT,
    QueryKey
  >
) => {
  return useQuery(["PurchaseSummary"], getPurchaseSummary, options);
};
