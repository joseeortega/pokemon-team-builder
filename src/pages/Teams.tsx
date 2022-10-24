import { Button } from "primereact/button";
import { useState } from "react";
import { IPokemonMini, IPokeTeam } from "../models/pokemon.model";
import Team from "../components/Team";

function Teams() {
  const [pokeTeams, setPokeTeams] = useState<IPokeTeam[]>([]);
  return (
    <div id="Teams">
      <div>
        <h1>Teams</h1>
        <a href="/home">
          <Button label="Go Home" />
        </a>
        {pokeTeams.length ? (
          <div>
            {pokeTeams.map((pokeTeam: IPokeTeam) => {
              return (
                <div>
                  <p>{pokeTeam.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p>You already have not created a Pokemon Team.</p>
            <a href="/create-team">
              <Button label="Create your first Team!" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
