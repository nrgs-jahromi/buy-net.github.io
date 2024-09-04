import { ApiError, fetcher } from "../config";
import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

type GeneralInfoT = {
  name: string;
  icon: string;
  color: string;
};

type QueryKey = ["generalInfo", { store_id: string }];

const getGeneralInfo: QueryFunction<GeneralInfoT, QueryKey> = async ({
  queryKey,
}) => {
  const [, { store_id }] = queryKey;
  const { data: dataRes } = await fetcher.get<GeneralInfoT>(
    `/stores/general-info/${store_id}/`
  );
  return dataRes;
};

export const useGeneralInfo = (
  store_id: string,
  options?: UseQueryOptions<GeneralInfoT, ApiError,GeneralInfoT, QueryKey>
) => {
  return useQuery(["generalInfo", { store_id }], getGeneralInfo, options);
};
