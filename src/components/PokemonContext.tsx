import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  IPokemon,
  IPokeTeam,
  IPokeTeamEdit,
  IPokeTeamRes,
  IPokeTypeDisplay,
  IPokeTypeInfo,
  POKE_TYPE_IMAGE,
} from "../models/pokemon.model";
import { getPokemon, getTypes } from "../services/PokeApi";
import { AuthContext } from "./AuthContext";
import { getTeamsByUser } from "../services/JSONServerApi";
import { IUser } from "../models/user.model";

export interface PokemonContext {
  pokemonTypes: IPokeTypeDisplay[];
  loaded: boolean;
  teams: IPokeTeam[];
  addTeam: (team: IPokeTeam) => void;
  deleteTeam: (team: IPokeTeam) => void;
}

export const PokemonContext = createContext<PokemonContext>({
  pokemonTypes: [],
  loaded: false,
  teams: [],
  addTeam: () => {},
  deleteTeam: (team: IPokeTeam) => {},
});

export function PokemonContextProvider({ children }) {
  const { userLogged } = useContext(AuthContext);

  const [pokemonTypes, setPokemonTypes] = useState<IPokeTypeDisplay[]>([]);
  const [teams, setTeams] = useState<IPokeTeam[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchAllPokemonTypes();
  }, []);

  useEffect(() => {
    setLoaded(false);
    fetchAllTeams();
  }, [userLogged]);

  const fetchAllPokemonTypes = () => {
    getTypes().then(
      (
        response: AxiosResponse<{
          count: number;
          results: IPokeTypeInfo[];
        }>
      ) => {
        setPokemonTypes(
          response.data.results
            .map((pokeTypeInfo: IPokeTypeInfo) => {
              return {
                ...pokeTypeInfo,
                name:
                  pokeTypeInfo.name.charAt(0).toUpperCase() +
                  pokeTypeInfo.name.slice(1),
                imageUrl: (POKE_TYPE_IMAGE as any)[pokeTypeInfo.name],
              } as IPokeTypeDisplay;
            })
            .filter((pokeTypeInfo: IPokeTypeDisplay) => pokeTypeInfo.imageUrl)
        );
        setLoaded(true);
      }
    );
  };

  const fetchAllTeams = () => {
    if (userLogged) {
      getTeamsByUser(userLogged as IUser).then(
        (response: AxiosResponse<IPokeTeamRes[]>) => {
          const teams: IPokeTeam[] = response.data.map((team: IPokeTeamRes) => {
            const teamFull: IPokeTeamEdit = {
              id: team.id,
              name: team.name,
              pokemons: [],
            };

            team.pokemons.forEach(async (pokemonName: string) => {
              const pokemon: IPokemon = (
                (await getPokemon(pokemonName)) as AxiosResponse<IPokemon>
              ).data;
              teamFull.pokemons.push(pokemon);
            });

            return teamFull;
          });
          setTeams(teams);
          setLoaded(true);
        }
      );
    }
  };

  const addTeam = (team: IPokeTeam) => {
    setTeams([...teams, team]);
  };

  const deleteTeam = (team: IPokeTeam) => {
    setTeams(teams.filter((team: IPokeTeam) => team.name !== team.name));
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonTypes,
        loaded,
        teams,
        addTeam,
        deleteTeam,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
