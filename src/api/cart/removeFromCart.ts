import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type RemoveFromCartDataT = {
  params: {
    storeId: string;
  };
  body: {
    barcode: string;
    quantity: number;
  }[];
};

interface AddToCartResponse {
  detail: string;
}

const removeFromCart = async (
  product: RemoveFromCartDataT
): Promise<AddToCartResponse> => {
  const { data } = await fetcher.post<AddToCartResponse>(
    `/invoices/remove-from-cart/${product.params.storeId}/`,
    { products: product.body }
  );
  return data;
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation(removeFromCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
    },
  });
};
