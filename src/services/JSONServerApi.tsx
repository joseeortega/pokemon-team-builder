import { ILoginUser, IUser } from "../models/user.model";
import JSONServerAxiosInstance from "./JSONServerAxiosClient";

export const createUser = async (user: IUser) => {
  return JSONServerAxiosInstance.getInstance().post("users", user);
};

export const loginUser = async (user: ILoginUser) => {
  return JSONServerAxiosInstance.getInstance().get("users", {
    params: { ...user },
  });
};

export const getTeamsByUser = async (user: IUser) => {
  return JSONServerAxiosInstance.getInstance().get("teams", {
    params: { user: user.id },
  });
};
