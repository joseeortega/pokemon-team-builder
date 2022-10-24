import React, { useContext, useState, useEffect, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import {
  IPokeTypeDisplay,
  IPokeTypeInfo,
  POKE_TYPE_IMAGE,
} from "../models/pokemon.model";
import { getTypes } from "../services/PokeApi";

export interface PokemonContext {
  pokemonTypes: IPokeTypeDisplay[];
  loaded: boolean;
}

export const PokemonContext = createContext<PokemonContext>({
  pokemonTypes: [],
  loaded: false,
});

export function PokemonContextProvider({ children }) {
  const [pokemonTypes, setPokemonTypes] = useState<IPokeTypeDisplay[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchAllPokemonTypes();
  }, []);

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

  return (
    <PokemonContext.Provider
      value={{
        pokemonTypes,
        loaded,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
