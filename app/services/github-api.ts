import { Service } from 'denali';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class GithubApiService extends Service {

  axios: AxiosInstance;

  init() {
    this.axios = axios.create({
      baseURL: 'https://api.github.com'
    });
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }
  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

}

export interface GithubUserData {
  id: number;
  username: string;
};
