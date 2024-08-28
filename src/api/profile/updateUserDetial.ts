import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type UpdateUserDetailsT = Partial<UserDetailsT>;
type ResT = UserDetailsT;

const updateUserDetails: MutationFunction<ResT, UpdateUserDetailsT> = async (
  updatedFields
) => {
  const { data: dataRes } = await fetcher.put<ResT>(
    "/customers/edit/",
    updatedFields
  );
  return dataRes;
};

export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<ResT, ApiError, UpdateUserDetailsT>(updateUserDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
    },
  });
};
