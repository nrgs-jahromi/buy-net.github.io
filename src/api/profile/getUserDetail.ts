import { ApiError, fetcher } from "../config";
import { QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query";

type ResT = UserDetailsT;

type QueryKey = ["userDetails"];

const getUserDetails: QueryFunction<ResT, QueryKey> = async (key) => {
  const { data: dataRes } = await fetcher.get<ResT>("/customers/info/");
  return dataRes;
};

export const useUserDetails = (options?: UseQueryOptions<ResT, ApiError, ResT, QueryKey>) => {
  return useQuery(["userDetails"], getUserDetails, options);
};
