import { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokemon from "./Pokemon";
import { IPagination } from "../models/pagination.model";
import {
  IPokemonMini,
  IPokeType,
  IPokeTypeDisplay,
  POKE_TYPE_IMAGE,
  IPokeTypeInfo,
  IPokemonFilter,
} from "../models/pokemon.model";
import { getPokemons, getTypes } from "../services/PokeApi";
import { PokemonContext } from "./PokemonContext";
import PokemonsFilter from "./PokemonsFilter";
import pokemon from "./Pokemon";

function PokemonsPick() {
  const POKEMON_QUANTITY_FETCH = 1500;
  const POKEMON_QUANTITY_DISPLAY = 10;

  const [pokemons, setPokemons] = useState<IPokemonMini[]>([]);
  const [totalPokemon, setPokemonLength] = useState<number>();

  const [pokemonFilter, setPokemonFilter] = useState<IPokemonFilter>({
    name: "",
    types: [],
  });

  const [displayPagination, setDisplayPagination] = useState<IPagination>({
    limit: POKEMON_QUANTITY_DISPLAY,
    offset: 0,
  });
  const [pokemonsDisplay, setPokemonsDisplay] = useState<IPokemonMini[]>([]);

  const ALL_POKEMONS_PAGINATION: IPagination = {
    limit: POKEMON_QUANTITY_FETCH,
    offset: 0,
  };

  const entryStyle = {};

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    getNextPokemonDisplay();
  }, [pokemons, displayPagination]);

  const fetchAllPokemons = () => {
    getPokemons(ALL_POKEMONS_PAGINATION).then(
      (
        response: AxiosResponse<{
          count: number;
          results: IPokemonMini[];
        }>
      ) => {
        setPokemons(response.data.results);
        debugger;
        setPokemonLength(response.data.count);
      }
    );
  };

  const getNextPokemonDisplay = () => {
    setPokemonsDisplay([
      ...pokemonsDisplay,
      ...chunkPokemonByPagination(displayPagination, pokemons),
    ]);
  };

  const displayMorePokemons = () => {
    setDisplayPagination(getNextPagination());
  };

  const getNextPagination = (): IPagination => {
    let nextLimit = 0;

    const pokemonsFiltered: IPokemonMini[] = getFilteredPokemon(
      pokemons,
      pokemonFilter
    );

    if (totalPokemon) {
      nextLimit = totalPokemon - pokemonsDisplay.length;
    }

    nextLimit =
      nextLimit > POKEMON_QUANTITY_DISPLAY
        ? POKEMON_QUANTITY_DISPLAY
        : nextLimit;

    return {
      limit: nextLimit,
      offset: pokemonsDisplay.length,
    };
  };

  const chunkPokemonByPagination = (pagination: IPagination, data: any[]) => {
    return [...data].splice(
      pagination.offset,
      pagination.offset + pagination.limit + 1
    );
  };

  const getFilteredPokemon = (
    allPokemons: IPokemonMini[],
    pokemonFilter: IPokemonFilter
  ) => {
    return allPokemons.filter((pokemon: IPokemonMini) => {
      return pokemon.name.includes(pokemonFilter.name);
    });
  };

  const filterPokemon = (pokemonFilter: IPokemonFilter) => {
    debugger;
    setPokemonFilter(pokemonFilter);
    const pokemonsFiltered: IPokemonMini[] = getFilteredPokemon(
      pokemons,
      pokemonFilter
    );
    console.log("pokemonsFiltered", pokemonsFiltered);
    console.log("pokemonFilter.name", pokemonFilter.name);
    const newPagination = {
      limit: POKEMON_QUANTITY_DISPLAY,
      offset: 0,
    };
    setPokemonsDisplay(
      chunkPokemonByPagination(newPagination, pokemonsFiltered)
    );
    /*setDisplayPagination(newPagination);*/
  };

  return (
    <div id="PokemonsPick" style={entryStyle}>
      <div onClick={() => filterPokemon({ name: "bulbasaur", types: [] })}>
        Pokemon total length: {pokemons.length}
      </div>

      <PokemonsFilter filterPokemon={filterPokemon}></PokemonsFilter>

      {pokemonsDisplay && (
        <InfiniteScroll
          dataLength={pokemonsDisplay.length} //This is important field to render the next data
          next={displayMorePokemons}
          hasMore={pokemonsDisplay.length !== totalPokemon}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              background: "#e5e5e5",
              borderTop: "1em solid #939393",
              margin: "1em",
            }}
          >
            {pokemonsDisplay.map((pokemon, index) => (
              <div
                key={index}
                style={{
                  width: "40%",
                  margin: "1em",
                  paddingTop: "2em",
                  paddingBottom: "2em",
                }}
              >
                <Pokemon pokemon={pokemon}></Pokemon>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PokemonsPick;
