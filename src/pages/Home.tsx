import { AxiosResponse } from "axios";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokemon from "../components/Pokemon";
import { IPagination } from "../models/pagination.model";
import { IPokemonMini } from "../models/pokemon.model";
import { getPokemons } from "../services/PokeApi";

function Home(props: { enableLoadingScreen: () => void }) {
  const POKEMON_QUANTITY_FETCH = 100;

  const [pokemons, setPokemons] = useState<IPokemonMini[]>([]);
  const [totalPokemon, setPokemonLength] = useState<number>();
  const [pagination, setPagination] = useState<IPagination>({
    limit: POKEMON_QUANTITY_FETCH,
    offset: 0,
  });

  const entryStyle = {};

  useEffect(() => {
    fetchPokemons();
  }, [pagination]);

  const nextPokemons = () => {
    setPagination(getNextPagination());
  };

  const getNextPagination = (): IPagination => {
    let nextLimit = 0;
    if (totalPokemon) {
      nextLimit = totalPokemon - pokemons.length;
    }

    nextLimit =
      nextLimit > POKEMON_QUANTITY_FETCH ? POKEMON_QUANTITY_FETCH : nextLimit;

    return {
      limit: nextLimit,
      offset: pokemons.length,
    };
  };

  const fetchPokemons = () => {
    debugger;
    getPokemons(pagination).then(
      (
        response: AxiosResponse<{
          count: number;
          results: IPokemonMini[];
        }>
      ) => {
        setPokemons([...pokemons, ...response.data.results]);
        setPokemonLength(response.data.count);
      }
    );
  };

  return (
    <div id="Home" style={entryStyle}>
      <div>
        <h1>Pokemon Team Builder</h1>
        <Button
          onClick={props.enableLoadingScreen}
          label="Enable loading screen"
        />
        <p>
          Create your own Pokemon Team easily selecting your favourite
          competitive Pokemon!
        </p>
      </div>
      <div>Pokemon total length: {pokemons.length}</div>

      {pokemons && (
        <InfiniteScroll
          dataLength={pokemons.length} //This is important field to render the next data
          next={nextPokemons}
          hasMore={pokemons.length !== totalPokemon}
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
            {pokemons.map((pokemon, index) => (
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

export default Home;
