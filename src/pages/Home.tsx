import { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokemon from "../components/Pokemon";
import { IPagination } from "../models/pagination.model";
import {
  IPokemonMini,
  IPokeType,
  IPokeTypeDisplay,
  POKE_TYPE_IMAGE,
  IPokeTypeInfo,
} from "../models/pokemon.model";
import { getPokemons, getTypes } from "../services/PokeApi";
import PokemonsPick from "../components/PokemonsPick";

function Home(props: { enableLoadingScreen: () => void }) {
  const entryStyle = {};

  return (
    <div id="Home" style={entryStyle}>
      <div>
        <h1>Pokemon Team Builder</h1>
        <Button
          onClick={props.enableLoadingScreen}
          label="Enable loading screen"
        />
        <a href="/teams">
          <Button label="Go Teams" />
        </a>
        <p>
          Create your own Pokemon Team easily selecting your favourite
          competitive Pokemon!
        </p>
      </div>

      <PokemonsPick></PokemonsPick>
    </div>
  );
}

export default Home;
