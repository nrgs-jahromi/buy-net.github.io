import { ApiError, fetcher } from "../config";
import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

export type PurchasedT = {
  store_name: string;
  purchase_time: string;
  invoice_id: string;
  store_logo: string;
  payable_amount:number;
};

type ResT = PurchasedT[];

type QueryKey = ["Invoices"];

const getInvoiceList: QueryFunction<ResT, QueryKey> = async (key) => {
  const { data: dataRes } = await fetcher.get<ResT>(
    "/customers/purchased-stores/"
  );
  return dataRes;
};

export const useInvoices = (
  options?: UseQueryOptions<ResT, ApiError, ResT, QueryKey>
) => {
  return useQuery(["Invoices"], getInvoiceList, options);
};
