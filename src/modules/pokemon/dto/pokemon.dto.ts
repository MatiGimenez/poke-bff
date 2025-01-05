import { Specie } from '../model/pokemon-specie.model';
import { Pokemon } from '../model/pokemon.model';

export type PokemonDto = Omit<Pokemon, 'species'> & { species: Specie };
