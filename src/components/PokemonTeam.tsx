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

function PokemonTeam(props: {
  team: IPokeTeamEdit | IPokeTeam;
  editable: boolean;
  slotSelected?: number;
  setSlotSelected?: (slot: number) => void;
  deletePokemon?: (pokemonPos: number) => void;
}) {
  const getSlotSelectedStyles = (slotNumber: number) => {
    return props.slotSelected == slotNumber
      ? { border: "1em solid #bbbbbb" }
      : {};
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {[...Array(6)].map((pokemon: IPokemon, index: number) => {
        const pokemonEl = (props.team as IPokeTeamEdit).pokemons[index];
        return (
          <div
            key={index}
            onClick={() => props.editable && props.setSlotSelected?.(index)}
            style={props.editable ? { cursor: "pointer" } : {}}
          >
            <p>
              #{index + 1} {pokemonEl?.name ? `- ${pokemonEl?.name}` : ``}
            </p>

            <div
              style={{
                width: "100%",
                background: "#8d8d8d",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  ...getSlotSelectedStyles(index),
                }}
              >
                {pokemonEl?.sprites ? (
                  <div>
                    <img
                      src={pokemonEl?.sprites.front_default}
                      style={{ width: "100%" }}
                    />

                    {props.editable && (
                      <Button
                        onClick={() =>
                          props.editable && props.deletePokemon?.(index)
                        }
                        icon="pi pi-times"
                        className="p-button-rounded p-button-danger"
                        aria-label="Cancel"
                        style={{
                          position: "absolute",
                          top: "-5px",
                          right: "-10px",
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        "https://static.thenounproject.com/png/40583-200.png"
                      }
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonTeam;
