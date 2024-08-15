import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type ResT = null;

const logoutUser: MutationFunction<ResT, void> = async () => {
  await fetcher.post<ResT>("/logout/");
  return null;
};

export const useUserLogout = () => {
  return useMutation<ResT, ApiError, void>(["logoutUser"], logoutUser);
};
