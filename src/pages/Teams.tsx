import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { IPokemonFilter, IPokeTeam } from "../models/pokemon.model";
import { PokemonContext } from "../components/PokemonContext";
import { useNavigate } from "react-router-dom";
import PokemonTeam from "../components/PokemonTeam";
import { Card } from "primereact/card";
import TableFilterScroll from "../components/TableFilterScroll";
import pokemonTeam from "../components/PokemonTeam";

function Teams(props: { enableLoadingScreen: () => void }) {
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

  const getFilteredPokemonTeam = (
    teams: IPokeTeam[],
    pokemonFilter: IPokemonFilter
  ) => {
    return teams.filter((team: IPokeTeam) => {
      return team.name.includes(pokemonFilter.name);
    });
  };

  const setFilterData = (pokemonFilter: IPokemonFilter) => {
    setPokemonFilter(pokemonFilter);
  };

  const editTeam = (pokeTeam: IPokeTeam) => {
    navigate("/create-team");
  };

  const deleteTeam = (pokeTeam: IPokeTeam) => {
    deleteTeamAction(pokeTeam);
  };

  const generateTableElement = (pokeTeam: IPokeTeam, index: number) => {
    const footer = (
      <span>
        <Button
          label="Save"
          icon="pi pi-check"
          style={{ marginRight: ".25em" }}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-secondary"
          onClick={() => deleteTeam(pokeTeam)}
        />
      </span>
    );

    return (
      <Card
        key={index}
        style={{
          paddingLeft: "3em",
          paddingRight: "3em",
        }}
        footer={footer}
        header={<h2 style={{ textAlign: "left" }}>{pokeTeam.name}</h2>}
      >
        <PokemonTeam team={pokeTeam} editable={false}></PokemonTeam>
      </Card>
    );
  };

  return (
    <div id="Teams">
      <div>
        <h1>Teams</h1>
        <Button
          onClick={props.enableLoadingScreen}
          label="Enable loading screen"
        />
        {pokeTeams.length}
        {teams.length ? (
          <div>
            <Button
              onClick={() => navigate("/create-team")}
              style={{ margin: "1em" }}
              label="Create Team!"
            />

            <TableFilterScroll
              quantityDisplay={POKEMON_TEAM_DISPLAY}
              elements={teams}
              filterData={pokemonFilter}
              setFilterData={setPokemonFilter}
              filterElements={getFilteredPokemonTeam}
              generateChildren={generateTableElement}
            ></TableFilterScroll>
          </div>
        ) : (
          <div>
            <p>You already have not created a Pokemon Team.</p>

            <Button
              onClick={() => navigate("/create-team")}
              label="Create your first Team!"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
