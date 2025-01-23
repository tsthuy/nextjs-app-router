/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

class apiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 404:
              break;
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response as T;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response as T;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response as T;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response as T;
  }
}

const apiClientInstance = new apiClient(
  "https://6768e610cbf3d7cefd38f134.mockapi.io/api"
);

export default apiClientInstance;
