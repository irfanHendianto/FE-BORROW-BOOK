import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import API_BASE_URL from "@/utils/apiConfig"; // Impor konfigurasi base URL

type RequestConfig = {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: AxiosRequestConfig["data"];
  token?: string;
};

export const apiRequest = async ({
  method,
  url,
  data,
}: RequestConfig): Promise<AxiosResponse["data"]> => {
  try {
    const token = localStorage.getItem('token');
    const headers: AxiosRequestConfig["headers"] = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`, // Menggunakan base URL
      data,
      headers,
    });

    return response.data;
  } catch (error:any) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = "/login";
    }
    throw error.response.data;
  }
};

