import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import { IPokemon, IPokemonMini } from "../models/pokemon.model";
import { getPokemons } from "../services/PokeApi";

function Home(props: { enableLoadingScreen: () => void }) {
  const [pokemons, setPokemons] = useState<IPokemonMini[]>([]);

  const entryStyle = {};

  useEffect(() => {
    getPokemons({ limit: 10, offset: 0 }).then(
      (
        response: AxiosResponse<{
          results: any[];
        }>
      ) => {
        setPokemons(response.data.results);
      }
    );
  }, []);

  return (
    <div id="Home" style={entryStyle}>
      <div>
        <h1>Pokemon Team Builder</h1>
        <button onClick={props.enableLoadingScreen}>
          Enable loading screen
        </button>
        <p>
          Create your own Pokemon Team easily selecting your favourite
          competitive Pokemon!
        </p>
      </div>
      <div>Pokemon total length: {pokemons.length}</div>
      {pokemons.map((pokemon, index) => (
        <Pokemon key={index} pokemon={pokemon}></Pokemon>
      ))}
    </div>
  );
}

export default Home;
