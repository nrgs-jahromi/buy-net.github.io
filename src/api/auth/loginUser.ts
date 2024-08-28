import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ApiError, fetcher } from "../config";

type DataT = {
  body: {
    mobile_number: string;
  };
};

type ResT = {
  message: string;
  expire_time: string;
};
const loginUser: MutationFunction<ResT, DataT> = async (data) => {
  const { data: dataRes } = await fetcher.post<ResT>(
    "/customers/login/",
    data.body
  );
  return dataRes;
};

export const useUserLogin = () => {
  return useMutation<ResT, ApiError, DataT>(["loginUser"], loginUser);
};
