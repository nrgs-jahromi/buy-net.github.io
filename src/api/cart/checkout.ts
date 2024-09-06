import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type CheckoutDataT = {
  params: {
    storeId: string;
  };
};

interface CheckoutResponse {
  detail: string;
}

const checkout = async (
  data: CheckoutDataT
): Promise<CheckoutResponse> => {
  const { data: response } = await fetcher.post<CheckoutResponse>(
    `/invoices/checkout/${data.params.storeId}/`
  );
  return response;
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation(checkout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error during checkout:", error);
    },
  });
};
