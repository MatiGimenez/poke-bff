export interface PokemonListResponseDto {
  id: number;
  name: string;
  image: string;
  types: PokemonTypeDto[];
  backgroundColor: string;
}

export interface PokemonTypeDto {
  name: string;
  color: string;
}
