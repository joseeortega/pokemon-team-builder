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
  const { pokemonTypes, loaded } = useContext(PokemonContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<{ name: string; pokemonTypes: IPokeTypeDisplay[] }>({
    defaultValues: {
      name: "",
      pokemonTypes: [],
    },
    mode: "onChange",
  });

  debugger;
  const { onChange, onBlur, name, ref } = register("pokemonTypes");

  useEffect(() => {
    selectAllTypes();
  }, [loaded]);

  useEffect(() => {
    const subscription = watch(() => {
      const formValues = getValues();

      const pokemonFilter: IPokemonFilter = {
        name: formValues.name,
        types: formValues.pokemonTypes.map(
          (pokemonType: IPokeTypeDisplay) => pokemonType.name
        ),
      };
      props.filterPokemon(pokemonFilter);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const selectAllTypes = () => {
    setValue("pokemonTypes", [...pokemonTypes], {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const deselectAllTypes = () => {
    setValue("pokemonTypes", [], {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const toggleType = (pokemonType: IPokeTypeDisplay) => {
    let pokeTypesResult = [...getValues().pokemonTypes];

    if (getValues().pokemonTypes.length == pokemonTypes.length) {
      pokeTypesResult = [pokemonType];
    } else {
      const pokeTypeFoundIndex: number = getValues().pokemonTypes.findIndex(
        (pokemonTypeEl: IPokeTypeDisplay) =>
          pokemonTypeEl.name == pokemonType.name
      );
      if (pokeTypeFoundIndex == -1) {
        pokeTypesResult.push(pokemonType);
      } else {
        pokeTypesResult.splice(pokeTypeFoundIndex, 1);
      }
    }
    setValue("pokemonTypes", pokeTypesResult, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const isTypeSelected = (pokemonType: IPokeTypeDisplay) => {
    return getValues().pokemonTypes.find(
      (pokemonTypeEl: IPokeTypeDisplay) =>
        pokemonTypeEl.name == pokemonType.name
    );
  };

  return (
    <div id="PokemonFilter" style={{ padding: "2em" }}>
      <form>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="button"
            onClick={selectAllTypes}
            style={{ marginRight: "1em" }}
            label="All"
          />
          <Button type="button" onClick={deselectAllTypes} label="None" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "2em",
          }}
        >
          {pokemonTypes.map((pokemonType: IPokeTypeDisplay, index: number) => (
            <div
              key={index}
              style={{
                cursor: "pointer",
                paddingLeft: "1em",
                paddingRight: "1em",
                paddingTop: "1em",
                opacity: isTypeSelected(pokemonType) ? 1 : 0.4,
              }}
              onClick={() => toggleType(pokemonType)}
            >
              <img src={pokemonType.imageUrl} style={{ width: "40px" }}></img>
              <p style={{ marginTop: "0em" }}>{pokemonType.name}</p>
            </div>
          ))}
        </div>

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
