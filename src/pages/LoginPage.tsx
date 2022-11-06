import Login from "../components/Login";
import { useContext, useEffect, useState } from "react";
import { IPokemonFilter, IPokeTeam } from "../models/pokemon.model";
import { PokemonContext } from "../components/PokemonContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  let navigate = useNavigate();

  const POKEMON_TEAM_DISPLAY = 10;

  const { teams: pokeTeams, deleteTeam: deleteTeamAction } =
    useContext(PokemonContext);

  const [teams, setTeams] = useState<IPokeTeam[]>(pokeTeams);

  const [pokemonFilter, setPokemonFilter] = useState<IPokemonFilter>({
    name: "",
  });

  useEffect(() => {
    setTeams(pokeTeams);
  }, [pokeTeams]);

  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default LoginPage;
