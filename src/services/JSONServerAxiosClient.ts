import { AxiosInstance as AxiosIns } from "axios";
import AxiosClient from "./AxiosClient";

class JSONServerAxiosInstance {
  private static _classInstance: JSONServerAxiosInstance;
  private axiosInstance: AxiosIns | null = null;

  private constructor() {
    this.axiosInstance = AxiosClient.getInstance(
      "http://localhost:3000"
    ) as AxiosIns;
  }

  public static getInstance(): AxiosIns {
    const result = this._classInstance || (this._classInstance = new this());
    return result.axiosInstance as AxiosIns;
  }
}

export default JSONServerAxiosInstance;
