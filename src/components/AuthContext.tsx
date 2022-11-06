import React, { useContext, useState, useEffect, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import {
  IPokeTeam,
  IPokeTypeDisplay,
  IPokeTypeInfo,
  POKE_TYPE_IMAGE,
} from "../models/pokemon.model";
import { getTypes } from "../services/PokeApi";
import { IUser } from "../models/user.model";

export interface IAuthContext {
  userLogged: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userLogged: null,
  login: (user: IUser) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [userLogged, setUserLogged] = useState<IUser>(null);

  const login = (user: IUser) => {
    setUserLogged(user);
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
