import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type ConfirmPaymentDataT = {
  params: {
    storeId: string;
  };
};

interface ConfirmPaymentResponse {
  detail: string;
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
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error during payment confirmation:", error);
    },
  });
};
