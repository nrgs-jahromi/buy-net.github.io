import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../config";

export type AddToCartDataT = {
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

const addToCart = async (
  product: AddToCartDataT
): Promise<AddToCartResponse> => {
  const { data } = await fetcher.post<AddToCartResponse>(
    `/invoices/add-to-cart/${product.params.storeId}/`,
    { products: product.body }
  );
  return data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
    },
  });
};
