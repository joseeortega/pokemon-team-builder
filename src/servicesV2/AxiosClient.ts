import axios, { AxiosInstance as AxiosIns } from "axios";

class PokeAxiosInstance {
  private axiosInstance: AxiosIns | null = null;

  private constructor(baseUrl: string) {
    const defaultOptions = {
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.axiosInstance = axios.create(defaultOptions);
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (["put", "post"].includes(response.config.method || "")) {
        }
        //Response Successful
        return response;
      },
      (error) => {
        if (error?.status?.code === 401) {
          //Unauthorized
          //redirect to Login*
        } else {
          //dispatch your error in a more user friendly manner*
        }
        return error;
      }
    );
  }

  public static getInstance(baseUrl: string): AxiosIns {
    const result = new this(baseUrl);
    return result.axiosInstance as AxiosIns;
  }
}

export default PokeAxiosInstance;
