import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type ConfirmPaymentDataT = {
  params: {
    storeId: string;
  };
};

interface Product {
  name: string;
  price: number;
  primary_image_url: string;
}

interface Item {
  product: Product;
  quantity: number;
  total_price_without_discount: number;
  total_price_with_discount: number;
}

interface ConfirmPaymentResponse {
  invoice_number: string;
  store: string;
  payable_amount: number;
  total_price_without_discount: number;
  tax: number;
  total_price_with_discount: number;
  items: Item[];
}

const confirmPayment = async (
  data: ConfirmPaymentDataT
): Promise<ConfirmPaymentResponse> => {
  const { data: response } = await fetcher.post<ConfirmPaymentResponse>(
    `/invoices/confirm-payment/${data.params.storeId}/`
  );
  return response;
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation(confirmPayment, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["cart"]);
      // Handle successful payment confirmation here
      console.log("Payment confirmed:", response);
    },
    onError: (error) => {
      console.error("Error during payment confirmation:", error);
    },
  });
};
