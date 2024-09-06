import { ApiError, fetcher } from "../config";
import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

type InvoiceItemT = {
  product: {
    name: string;
    price: number;
    primary_image_url: string;
  };
  quantity: number;
  total_price_without_discount: number;
  total_price_with_discount: number;
};

type InvoiceDetailT = {
  invoice_number: string;
  store: string;
  payable_amount: number;
  total_price_without_discount: number;
  total_price_with_discount: number;
  tax: number;
  items: InvoiceItemT[];
};

type QueryKey = ["invoiceDetail", { invoice_id: string }];

const getInvoiceDetail: QueryFunction<InvoiceDetailT, QueryKey> = async ({ queryKey }) => {
  const [, { invoice_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<InvoiceDetailT>(`/invoices/info/${invoice_id}/`);
  return dataRes;
};

export const useInvoiceDetail = (
  invoice_id: string,
  options?: UseQueryOptions<InvoiceDetailT, ApiError, InvoiceDetailT, QueryKey>
) => {
  return useQuery(["invoiceDetail", { invoice_id }], getInvoiceDetail, options);
};
