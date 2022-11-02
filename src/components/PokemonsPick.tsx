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
  IPokemon,
} from "../models/pokemon.model";
import { getPokemons, getTypes } from "../services/PokeApi";
import { PokemonContext } from "./PokemonContext";
import PokemonsFilter from "./PokemonsFilter";
import pokemon from "./Pokemon";
import { ToggleButton } from "primereact/togglebutton";
import TableFilterScroll from "./TableFilterScroll";

function PokemonsPick(props: {
  selectPokemon: (iPokemonMini: IPokemonMini) => void;
}) {
  const POKEMON_QUANTITY_FETCH = 1500;
  const POKEMON_QUANTITY_DISPLAY = 10;

  const [pokemons, setPokemons] = useState<IPokemonMini[]>([]);

  const [pokemonFilter, setPokemonFilter] = useState<IPokemonFilter>({
    name: "",
  });

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
      }
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

  const setFilterData = (pokemonFilter: IPokemonFilter) => {
    setPokemonFilter(pokemonFilter);
  };

  const generateTableElement = (pokemon: IPokemonMini, index: number) => {
    return (
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
    );
  };

  return (
    <div id="PokemonsPick" style={entryStyle}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PokemonsFilter filterPokemon={setFilterData}></PokemonsFilter>
        <ToggleButton
          checked={showAdvancedPokeInfo}
          onLabel="Hide advanced Pokemon info"
          offLabel="Show advanced Pokemon info"
          onChange={(e) => toggleShowAdvancedInfo()}
        />
      </div>

      <TableFilterScroll
        quantityDisplay={POKEMON_QUANTITY_DISPLAY}
        elements={pokemons}
        filterData={pokemonFilter}
        setFilterData={setPokemonFilter}
        filterElements={getFilteredPokemon}
        generateChildren={generateTableElement}
      ></TableFilterScroll>
    </div>
  );
}

export default PokemonsPick;
