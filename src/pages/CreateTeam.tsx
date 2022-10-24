import { Button } from "primereact/button";
import { useState } from "react";
import { IPokemonMini, IPokeTeam } from "../models/pokemon.model";
import Team from "../components/Team";

function CreateTeam() {
  const [pokeTeams, setPokeTeams] = useState<IPokeTeam[]>([]);
  return (
    <div>
      <a href="/teams">
        <Button label="Go Teams" />
      </a>
      <Team></Team>
    </div>
  );
}

export default CreateTeam;
