import { Button } from "primereact/button";
import { useState } from "react";
import {
  IPokemonMini,
  IPokeTeam,
  IPokeTeamEdit,
  IPokemon,
} from "../models/pokemon.model";
import { FieldValues, useForm } from "react-hook-form";
import pokemon from "./Pokemon";

function Team() {
  const [pokeTeam, setPokeTeam] = useState<IPokeTeamEdit>({
    name: "",
    id: "",
    pokemons: [],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<{ name: string; pokemons: IPokemon[] }>({
    defaultValues: {
      name: "klk",
      pokemons: [],
    },
    mode: "onChange",
  });

  const isFullTeam = (pokemons: IPokemon[]) =>
    pokemons.length == 6 && pokemons.every((pokemon: IPokemon) => pokemon.name);

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

  const addPokemon = () => {
    setValue(
      "pokemons",
      [
        {
          name: "Bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
        },
        {
          name: "Bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
        },
        {
          name: "Bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
        },
        {
          name: "Bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
        },
        {
          name: "Bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
        },
        {
          name: "Bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          types: [
            {
              slot: 1,
              type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/",
              },
            },
            {
              slot: 2,
              type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/",
              },
            },
          ],
        },
      ] as any,
      {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      }
    );
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
          </div>
          <button onClick={addPokemon}>add random pokemon</button>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[...Array(6)].map((pokemon: IPokemon, index: number) => {
              const pokemonEl = getValues().pokemons[index];
              return (
                <div key={index}>
                  <p>
                    #{index + 1} - {pokemonEl?.name}
                  </p>
                  {pokemonEl?.sprites && (
                    <div
                      style={{
                        width: "100%",
                        background: "#8d8d8d",
                        position: "relative",
                      }}
                    >
                      <img
                        src={pokemonEl?.sprites.front_default}
                        style={{ width: "150px" }}
                      />
                      <Button
                        onClick={() => onDeletePokemon(index)}
                        icon="pi pi-times"
                        className="p-button-rounded p-button-danger"
                        aria-label="Cancel"
                        style={{
                          position: "absolute",
                          top: "-5px",
                          right: "-10px",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <input type="submit" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
}

export default Team;
