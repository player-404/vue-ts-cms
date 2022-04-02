import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface IOfIterceptors {
  requestInterceptors?(config: AxiosRequestConfig): AxiosRequestConfig;
  requestErrorIntercrptors?(error: AxiosError): Promise<AxiosError>;
  responseInterceptors?(response: AxiosResponse): AxiosResponse;
  responseErrorInterceptors?(error: AxiosError): Promise<AxiosError>;
}
export interface IOfConfig extends AxiosRequestConfig {
  interceptors?: IOfIterceptors;
  showLoading?: boolean;
}
