import { AxiosResponse } from "axios";
import { Badge } from "primereact/badge";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Slider } from "primereact/slider";
import { useEffect, useState } from "react";
import {
  IPokemon,
  IPokemonMini,
  PokeType,
  POKE_STAT_HIGHEST_POINT,
  POKE_STAT_INDEX,
} from "../models/pokemon.model";
import { getPokemon } from "../services/PokeApi";

function Pokemon(props: { pokemon: IPokemonMini }) {
  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    getPokemon(props.pokemon.name).then((response: AxiosResponse<IPokemon>) => {
      setPokemon(response.data);
    });
  }, []);

  const header = (
    <div style={{ width: "100%", background: "#8d8d8d" }}>
      <img src={pokemon?.sprites.front_default} style={{ width: "150px" }} />
    </div>
  );

  const powerBar = (value: number, name: string, max: number) => (
    <span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ width: "15%", textAlign: "left" }}>{name} </p>
        <div style={{ width: "70%" }}>
          <Slider
            className="slider ml-3"
            disabled={true}
            value={value}
            max={max}
          />
        </div>
        <div style={{ width: "15%", textAlign: "right" }}>
          <Badge
            style={{ width: "2.5em" }}
            value={value}
            size="xlarge"
            severity="success"
          ></Badge>
        </div>
      </div>
    </span>
  );

  const powerChat = () => (
    <Chart
      type="radar"
      data={{
        labels: ["Attack", "Defense", "S.Attack", "S. Defense", "Speed"],
        datasets: [
          {
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56],
          },
        ],
      }}
      style={{ position: "relative", width: "40%" }}
    />
  );

  return (
    <div>
      {pokemon && (
        <Card
          style={{ border: "0.2em solid #5c5c5c" }}
          title={pokemon?.name}
          subTitle={pokemon?.types
            .map(
              (pokeType: PokeType, index: number) =>
                pokeType.type.name.charAt(0).toUpperCase() +
                pokeType.type.name.slice(1)
            )
            .join(", ")}
          header={header}
        >
          {powerBar(
            pokemon.stats[POKE_STAT_INDEX.HP].base_stat,
            "HP",
            POKE_STAT_HIGHEST_POINT.HP
          )}
          {powerBar(
            pokemon.stats[POKE_STAT_INDEX.ATTACK].base_stat,
            "Attack",
            POKE_STAT_HIGHEST_POINT.ATTACK
          )}
          {powerBar(
            pokemon.stats[POKE_STAT_INDEX.DEFENSE].base_stat,
            "Defense",
            POKE_STAT_HIGHEST_POINT.DEFENSE
          )}
          {powerBar(
            pokemon.stats[POKE_STAT_INDEX.SPECIAL_ATTACK].base_stat,
            "S. Attack",
            POKE_STAT_HIGHEST_POINT.SPECIAL_ATTACK
          )}
          {powerBar(
            pokemon.stats[POKE_STAT_INDEX.SPECIAL_DEFENSE].base_stat,
            "S. Defense",
            POKE_STAT_HIGHEST_POINT.SPECIAL_DEFENSE
          )}
          {powerBar(
            pokemon.stats[POKE_STAT_INDEX.SPEED].base_stat,
            "Speed",
            POKE_STAT_HIGHEST_POINT.SPEED
          )}
          {/* {powerChat()} */}
        </Card>
      )}
    </div>
  );
}

export default Pokemon;
