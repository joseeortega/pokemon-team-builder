import { Button } from "primereact/button";
import { useContext, useState } from "react";
import {
  IPokemonMini,
  IPokeTeam,
  IPokeTeamEdit,
  IPokemon,
  IPokeType,
  POKE_TYPE_IMAGE,
  IPokeTypeDisplay,
  IPokemonDisplay,
} from "../models/pokemon.model";
import { FieldValues, useForm } from "react-hook-form";
import pokemon from "./Pokemon";
import PokemonsPick from "./PokemonsPick";
import { getPokemon } from "../services/PokeApi";
import { AxiosResponse } from "axios";
import { PokemonContext } from "./PokemonContext";
import { useNavigate } from "react-router-dom";
import PokemonTeam from "./PokemonTeam";

function Team() {
  const { teams } = useContext(PokemonContext);

  const [pokeTeam, setPokeTeam] = useState<IPokeTeamEdit>({
    name: "",
    id: "",
    pokemons: [],
  });

  const [slotSelected, setSlotSelected] = useState<number>(0);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<{ name: string; pokemons: IPokemon[] }>({
    defaultValues: {
      name: "",
      pokemons: [],
    },
    mode: "onChange",
  });

  const { addTeam } = useContext(PokemonContext);

  const isFullTeam = (pokemons: IPokemon[]) =>
    pokemons.length == 6 && pokemons.every((pokemon: IPokemon) => pokemon.name);

  const alreadyExistsTeamName = (name: string) =>
    !teams.find((team: IPokeTeam) => team.name == name);

  const { onChange, onBlur, name, ref } = register("pokemons", {
    required: true,
    validate: isFullTeam,
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  const onDeletePokemon = (index: number) => {
    const newPokemons = [...getValues().pokemons];
    newPokemons[index] = {} as any;
    setValue("pokemons", newPokemons, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const selectPokemon = (pokemon: IPokemonMini) => {
    getPokemon(pokemon.name).then((response: AxiosResponse<IPokemon>) => {
      const pokemons = getValues("pokemons");
      pokemons[slotSelected] = response.data;
      setValue("pokemons", pokemons, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
      let slotJumps = 0;
      let nextSlot = 0;
      do {
        console.log(nextSlot, getValues("pokemons")[nextSlot]);
        if (!getValues("pokemons")[nextSlot]?.id) {
          break;
        } else {
          if (nextSlot < 5) {
            nextSlot++;
          } else {
            nextSlot = 0;
          }
        }
        slotJumps++;
      } while (slotJumps < 5);
      console.log("nextSlot", nextSlot);
      setSlotSelected(nextSlot);
    });
  };

  const submitTeam = () => {
    const team: IPokeTeam = {
      id: "1",
      ...getValues(),
    };
    addTeam(team);
    navigate("/teams");
  };

  return (
    <div id="Teams">
      <div>
        <h1>Team {pokeTeam.name}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            defaultValue=""
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 9,
              validate: { alreadyExistsTeamName },
            })}
          />
          <div>
            {/* errors will return when field validation fails  */}
            {errors.name?.type == "required" && (
              <span>This field is required</span>
            )}
            {errors.name?.type == "minLength" && (
              <span>This field is should be minimun 3 characters</span>
            )}
            {errors.name?.type == "maxLength" && (
              <span>This field is should be maximun 9 characters</span>
            )}
            {errors.name?.type == "alreadyExistsTeamName" && (
              <span>This team already exists</span>
            )}
          </div>
          <div
            style={{
              paddingLeft: "3em",
              paddingRight: "3em",
            }}
          >
            <PokemonTeam
              team={getValues()}
              editable={true}
              slotSelected={slotSelected}
              setSlotSelected={setSlotSelected}
              deletePokemon={onDeletePokemon}
            ></PokemonTeam>
          </div>
          <input type="submit" disabled={!isValid} onClick={submitTeam} />
        </form>
        <div style={{ padding: "1em" }}>
          <PokemonsPick selectPokemon={selectPokemon}></PokemonsPick>
        </div>
      </div>
    </div>
  );
}

export default Team;
