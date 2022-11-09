import { ILoginUser, IUser } from "../models/user.model";
import JSONServerAxiosInstance from "./JSONServerAxiosClient";
import { IPokeTeam, IPokeTeamRes } from "../models/pokemon.model";

export const createUser = async (user: IUser) => {
  return JSONServerAxiosInstance.getInstance().post(`users`, user);
};

export const loginUser = async (user: ILoginUser) => {
  return JSONServerAxiosInstance.getInstance().get(`users`, {
    params: { ...user },
  });
};

export const getTeamsByUser = async (user: IUser) => {
  return JSONServerAxiosInstance.getInstance().get(`teams`, {
    params: { user: user.id },
  });
};

export const addTeam = async (team: IPokeTeamRes): Promise<IPokeTeam> => {
  return JSONServerAxiosInstance.getInstance().post(`teams`, team);
};

export const deleteTeam = async (team: IPokeTeamRes): Promise<IPokeTeam> => {
  return JSONServerAxiosInstance.getInstance().delete(`teams/${team.id}`);
};

export const updateTeam = async (team: IPokeTeamRes): Promise<IPokeTeam> => {
  return JSONServerAxiosInstance.getInstance().put(`teams/${team.id}`, team);
};
