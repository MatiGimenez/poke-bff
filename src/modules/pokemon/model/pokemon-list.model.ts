export interface PokemonList {
  count: number;
  results: BasePokemon[];
}

export interface BasePokemon {
  name: string;
  url: string;
}
