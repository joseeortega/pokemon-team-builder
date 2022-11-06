import { AxiosInstance as AxiosIns } from "axios";
import AxiosClient from "./AxiosClient";

class PokeAxiosInstance {
  private static _classInstance: PokeAxiosInstance;
  private axiosInstance: AxiosIns | null = null;

  private constructor() {
    this.axiosInstance = AxiosClient.getInstance(
      "https://pokeapi.co/api/v2"
    ) as AxiosIns;
  }

  public static getInstance(): AxiosIns {
    const result = this._classInstance || (this._classInstance = new this());
    return result.axiosInstance as AxiosIns;
  }
}

export default PokeAxiosInstance;
