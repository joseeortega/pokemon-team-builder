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
import { ToggleButton } from "primereact/togglebutton";

function PokemonsPick(props: {
  selectPokemon: (iPokemonMini: IPokemonMini) => void;
}) {
  const POKEMON_QUANTITY_FETCH = 1500;
  const POKEMON_QUANTITY_DISPLAY = 10;

  const [pokemons, setPokemons] = useState<IPokemonMini[]>([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState<IPokemonMini[]>([]);
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

  const [showAdvancedPokeInfo, setShowAdvancedPokeInfo] =
    useState<boolean>(false);

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

  useEffect(() => {
    const newPagination = {
      limit: POKEMON_QUANTITY_DISPLAY,
      offset: 0,
    };
    setPokemonsDisplay([]);
    setDisplayPagination(newPagination);
  }, [pokemonsFiltered]);

  const toggleShowAdvancedInfo = () => {
    setShowAdvancedPokeInfo(!showAdvancedPokeInfo);
  };

  const fetchAllPokemons = () => {
    getPokemons(ALL_POKEMONS_PAGINATION).then(
      (
        response: AxiosResponse<{
          count: number;
          results: IPokemonMini[];
        }>
      ) => {
        setPokemons(response.data.results);
        setPokemonsFiltered(response.data.results);
        setPokemonLength(response.data.count);
      }
    );
  };

  const getNextPokemonDisplay = () => {
    setPokemonsDisplay([
      ...pokemonsDisplay,
      ...chunkPokemonByPagination(displayPagination, pokemonsFiltered),
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
    return [...data].slice(
      pagination.offset,
      pagination.offset + pagination.limit
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
    setPokemonFilter(pokemonFilter);
    filterPokemonEffect(pokemonFilter);
  };

  const filterPokemonEffect = (pokemonFilter: IPokemonFilter) => {
    /*console.log("pokemons", pokemons);
    console.log("totalPokemon", totalPokemon);
    console.log("pokemonFilter", pokemonFilter);
    console.log("displayPagination", displayPagination);
    console.log("pokemonsDisplay", pokemonsDisplay);

    console.log("----------------------------------");*/

    const pokemonsFiltered: IPokemonMini[] = getFilteredPokemon(
      pokemons,
      pokemonFilter
    );
    console.log("pokemonsFiltered", pokemonsFiltered);
    console.log("pokemonFilter.name", pokemonFilter.name);

    setPokemonsFiltered(pokemonsFiltered);
  };

  return (
    <div id="PokemonsPick" style={entryStyle}>
      {/*<div>Pokemon total length: {pokemons.length}</div>*/}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PokemonsFilter filterPokemon={filterPokemon}></PokemonsFilter>
        <ToggleButton
          checked={showAdvancedPokeInfo}
          onLabel="Hide advanced Pokemon info"
          offLabel="Show advanced Pokemon info"
          onChange={(e) => toggleShowAdvancedInfo()}
        />
      </div>

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
                onClick={() => props.selectPokemon(pokemon)}
                style={{
                  width: "30%",
                  margin: "1em",
                  paddingTop: "2em",
                  paddingBottom: "2em",
                  cursor: "pointer",
                }}
              >
                <Pokemon
                  pokemon={pokemon}
                  showAdvancedPokeInfo={showAdvancedPokeInfo}
                ></Pokemon>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PokemonsPick;
