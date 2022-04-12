import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { IOfIterceptors, IOfConfig } from "./types";

import { ElLoading } from "element-plus";
import type { LoadingInstance } from "element-plus/es/components/loading/src/loading";

class Request {
  public axiosInstance: AxiosInstance;
  public interceptors?: IOfIterceptors;
  //loading组件实例
  public loading?: LoadingInstance;
  //是否显示loading组件
  public showLoading?: boolean;

  constructor(config: IOfConfig) {
    this.axiosInstance = axios.create(config);
    this.interceptors = config.interceptors;

    //实例请求拦截器
    this.axiosInstance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestErrorIntercrptors
    );
    //实例响应拦截器
    this.axiosInstance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseErrorInterceptors
    );

    //全局请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log("全局的请求拦截器");

        if (this.showLoading) {
          // 开启loading组件
          this.loading = ElLoading.service({
            text: "加载中...",
            fullscreen: true,
            lock: true,
            background: "rgba(0,0,0,.3)",
          });
        }

        return config;
      },
      (error) => {
        console.log("全局的请求错误拦截");

        //请求失败 关闭loading
        if (this.loading) {
          this.loading?.close();
        }
        return Promise.reject(error);
      }
    );

    //全局响应拦截器
    this.axiosInstance.interceptors.response.use(
      (config) => {
        console.log("全局的响应拦截器");

        // 响应成功 关闭loading
        if (this.loading) {
          this.loading.close();
        }

        // 对响应体进行过滤
        // return config.data;
        return config;
      },
      (error) => {
        console.log("全局的响应错误的拦截");

        //响应失败 关闭loading
        if (this.loading) {
          this.loading.close();
        }
        return Promise.reject(error);
      }
    );
  }

  // request请求 与 axios request请求一致
  request<T = any>(config: IOfConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      //默认显示，可以传入false关闭
      this.showLoading = config.showLoading ?? true;

      // 每次请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      // 执行axios实例的的request方法
      this.axiosInstance
        .request<T>(config)
        .then((res) => {
          // 每次请求的响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // get请求
  get<T = any>(config: IOfConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "get", ...config });
  }

  // post请求
  post<T = any>(config: IOfConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "post", ...config });
  }

  // patch请求
  patch<T = any>(config: IOfConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "patch", ...config });
  }

  // delete请求
  delete<T = any>(config: IOfConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "delete", ...config });
  }
}

export default Request;
