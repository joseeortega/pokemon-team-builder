import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  IPokemon,
  IPokeTeam,
  IPokeTeamRes,
  IPokeTypeDisplay,
  IPokeTypeInfo,
  POKE_TYPE_IMAGE,
} from "../models/pokemon.model";
import { getPokemon, getTypes } from "../services/PokeApi";
import { AuthContext } from "./AuthContext";
import {
  addTeam as addPokeTeam,
  deleteTeam as deletePokeTeam,
  getTeamsByUser,
} from "../services/JSONServerApi";
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
          const allPokemonNames: string[] = [];

          response.data.forEach((team: IPokeTeamRes) => {
            team.pokemons.forEach((pokemon: string) =>
              allPokemonNames.push(pokemon)
            );
          });

          const uniquePokemonNames: string[] = [...new Set(allPokemonNames)];

          const pokemonPromises: Promise<AxiosResponse<IPokemon>>[] =
            uniquePokemonNames.map((pokemon: string) => getPokemon(pokemon));

          Promise.all(pokemonPromises)
            .then((values: AxiosResponse<IPokemon>[]) => {
              const pokemonTeams: IPokeTeam[] = [];

              response.data.forEach((team: IPokeTeamRes) => {
                const pokemonTeam: IPokeTeam = {
                  id: team.id,
                  name: team.name,
                  pokemons: team.pokemons.map(
                    (pokemon: string) =>
                      (
                        values.find(
                          (pokemonRes: AxiosResponse<IPokemon>) =>
                            pokemon === pokemonRes.data.name
                        ) as AxiosResponse<IPokemon>
                      ).data
                  ),
                };
                pokemonTeams.push(pokemonTeam);
              });

              debugger;
              setTeams(pokemonTeams);
              setLoaded(true);
            })
            .catch((reason) => {
              console.log(reason);
            });
        }
      );
    }
  };

  const addTeam = (team: IPokeTeam) => {
    const pokeTeamRes: IPokeTeamRes = {
      ...team,
      pokemons: team.pokemons.map((pokemon: IPokemon) => pokemon.name),
    };
    addPokeTeam(pokeTeamRes).then((teamRes: IPokeTeam) => {
      debugger;
      //TODO: error handling
      setTeams([...teams, team]);
    });
  };

  const deleteTeam = (team: IPokeTeam) => {
    const pokeTeamRes: IPokeTeamRes = {
      ...team,
      pokemons: team.pokemons.map((pokemon: IPokemon) => pokemon.name),
    };
    debugger;
    deletePokeTeam(pokeTeamRes).then((teamRes: IPokeTeam) => {
      debugger;
      setTeams(teams.filter((teamEl: IPokeTeam) => teamEl.name !== team.name));
    });
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
