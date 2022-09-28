export interface IPokemonMini {
  name: string;
  url: string;
}

export interface IPokemon {
  abilities: Ability[];
  height: number;
  id: number;
  moves: Move[];
  name: string;
  order: number;
  sprites: Sprites;
  stats: Stat[];
  types: PokeType[];
  weight: number;
}

export interface AbilityInfo {
  name: string;
  url: string;
}

export interface Ability {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface Move {
  move: Move;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface StatInfo {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: StatInfo;
}

export interface PokeTypeInfo {
  name: string;
  url: string;
}

export interface PokeType {
  slot: number;
  type: PokeTypeInfo;
}
