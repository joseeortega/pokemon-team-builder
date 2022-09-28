import { AxiosResponse } from "axios";
import { CSSProperties, useEffect, useState } from "react";
import { IPokemon, IPokemonMini, PokeType } from "../models/pokemon.model";
import { getPokemon } from "../services/PokeApi";

function Pokemon(props: { pokemon: IPokemonMini }) {
  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    getPokemon(props.pokemon.name).then((response: AxiosResponse<IPokemon>) => {
      setPokemon(response.data);
    });
  }, []);

  return (
    <div>
      <img src={pokemon?.sprites.front_default} />
      <p>{pokemon?.name}</p>

      {pokemon?.types.map((pokeType: PokeType, index: number) => (
        <p key={index}>{pokeType.type.name}</p>
      ))}
    </div>
  );
}

export default Pokemon;
