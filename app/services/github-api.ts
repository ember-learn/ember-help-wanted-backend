import { Service } from 'denali';
import axios from 'axios';

export default class GithubApiService extends Service {

  init() {
    this.axios = axios.create({
      baseURL: 'https://api.github.com'
    });
  }

  get(...args) {
    return this.axios.get(...args);
  }
  post(...args) {
    return this.axios.post(...args);
  }
  put(...args) {
    return this.axios.put(...args);
  }
  delete(...args) {
    return this.axios.delete(...args);
  }

}
