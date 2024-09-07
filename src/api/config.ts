import axios, { AxiosError, AxiosResponse } from "axios";

// export const API_BASE_URL = "http://127.0.0.1:8000";
// export const API_BASE_URL = "https://scanbuy-backend.liara.run/";
export const API_BASE_URL = "https://scanbuy-back.liara.run/";

export const fetcher = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Token ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized: Redirecting to login...");

      // حذف accessToken
      localStorage.removeItem("accessToken");

      // هدایت به صفحه ورود
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export type ApiErrorData = {
  detail: {
    non_field_error: string[];
    [key: string]: string[];
  };
};

export type ApiError = AxiosError<ApiErrorData>;
