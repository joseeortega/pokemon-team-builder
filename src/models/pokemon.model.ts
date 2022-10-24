import { FixedLengthArray } from "./fixedArray.model";

export interface IPokemonMini {
  name: string;
  url: string;
  types: IPokeTypeDisplay[];
}

export interface IPokeTeamEdit {
  id?: string;
  name: string;
  pokemons: IPokemon[];
}

export interface IPokeTeam {
  id: string;
  name: string;
  pokemons: FixedLengthArray<
    [IPokemon, IPokemon, IPokemon, IPokemon, IPokemon, IPokemon]
  >;
}

export interface IPokemonDisplay {
  id: number;
  name: string;
  sprites: ISprites;
  stats: IStat[];
  types: IPokeTypeDisplay[];
}

export interface IPokemon {
  abilities: IAbility[];
  height: number;
  id: number;
  moves: IMove[];
  name: string;
  order: number;
  sprites: ISprites;
  stats: IStat[];
  types: IPokeType[];
  weight: number;
}

export interface IAbilityInfo {
  name: string;
  url: string;
}

export interface IAbility {
  ability: IAbilityInfo;
  is_hidden: boolean;
  slot: number;
}

export interface IVersionGroup {
  name: string;
  url: string;
}

export interface IMove {
  move: IMoveInfo;
}

export interface IMoveInfo {
  name: string;
  url: string;
}

export interface ISprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface IStatInfo {
  name: string;
  url: string;
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: IStatInfo;
}

export interface IPokeTypeInfo {
  name: string;
  url: string;
}

export interface IPokeTypeDisplay {
  name: string;
  url: string;
  imageUrl: string;
}

export interface IPokeType {
  slot: number;
  type: IPokeTypeInfo;
}

export interface IPokemonFilter {
  name: string;
  types: string[];
}

export enum POKE_STAT_INDEX {
  HP = 0,
  ATTACK = 1,
  DEFENSE = 2,
  SPECIAL_ATTACK = 3,
  SPECIAL_DEFENSE = 4,
  SPEED = 5,
}

export enum POKE_STAT_HIGHEST_POINT {
  HP = 255,
  ATTACK = 190,
  DEFENSE = 230,
  SPECIAL_ATTACK = 194,
  SPECIAL_DEFENSE = 230,
  SPEED = 180,
}

export enum POKE_TYPE_IMAGE {
  normal = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/2048px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
  fighting = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/2048px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png",
  flying = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/2048px-Pok%C3%A9mon_Flying_Type_Icon.svg.png",
  poison = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/2048px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",
  ground = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/512px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
  rock = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/512px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
  bug = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/1024px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",
  ghost = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/1024px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png",
  steel = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/2048px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",
  fire = "https://img.rankedboost.com/wp-content/uploads/2019/11/Fire-Type-Pokemon-Sword-and-Shield.png",
  water = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/1024px-Pok%C3%A9mon_Water_Type_Icon.svg.png",
  grass = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/800px-Pok%C3%A9mon_Grass_Type_Icon.svg.png",
  electric = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/1024px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
  psychic = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/2048px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",
  ice = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/1200px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
  dragon = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/2048px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",
  dark = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/2048px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
  fairy = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/1024px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",
}
