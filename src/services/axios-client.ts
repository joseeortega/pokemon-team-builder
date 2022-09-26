import axios, { AxiosInstance as AxiosIns } from 'axios';

class AxiosInstance {
  private static _classInstance: AxiosInstance;
  private axiosInstance: AxiosIns | null = null;

  private constructor() {
    const defaultOptions = {
      baseURL: 'https://pokeapi.co/api/v2',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.axiosInstance = axios.create(defaultOptions);
  }

  public static getInstance(): AxiosIns {
    const result = this._classInstance || (this._classInstance = new this());
    return result.axiosInstance as AxiosIns;
  }
}

export default AxiosInstance;
