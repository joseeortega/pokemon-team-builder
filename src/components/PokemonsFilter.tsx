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
  IPokemon,
  IPokemonDisplay,
  IPokemonFilter,
} from "../models/pokemon.model";
import { getPokemons, getTypes } from "../services/PokeApi";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "react-hook-form";

function PokemonsFilter(props: {
  filterPokemon: (pokemonFilter: IPokemonFilter) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log("subscribe to watch");
    const subscription = watch(() => {
      filter();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [props]);
  //was necesary to set props as dependency cause only was subscriben first time using method received in props and was using old parent state values

  const filter = () => {
    const formValues = getValues();

    const pokemonFilter: IPokemonFilter = {
      name: formValues.name,
    };
    props.filterPokemon(pokemonFilter);
  };

  return (
    <div id="PokemonFilter" style={{ padding: "2em" }}>
      <form>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          placeholder="Filter by Pokemon name..."
          defaultValue=""
          {...register("name", {
            required: true,
            minLength: 3,
            maxLength: 9,
          })}
        />
      </form>
    </div>
  );
}

export default PokemonsFilter;
