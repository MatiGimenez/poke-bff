export interface Pokemon {
  abilities: BaseAbility[];
  base_experience: number;
  forms: Form[];
  height: number;
  id: number;
  is_default: boolean;
  moves: Mfe[];
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats: BaseStat[];
  types: BaseType[];
  weight: number;
}

export interface BaseAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Ability {
  name: string;
  url: string;
}

export interface Form {
  name: string;
  url: string;
}

export interface Mfe {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

export interface Move {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
  other: Other;
}

export interface Other {
  home: Home;
  'official-artwork': OfficialArtwork;
}

export interface Home {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface BaseStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

export interface BaseType {
  slot: number;
  type: Type;
}

export interface Type {
  name: string;
  url: string;
}
