import { Injectable } from '@nestjs/common';
import { PokeApiRepository } from '../repository/poke-api.repository';
import { BasePokemon } from '../model/pokemon-list.model';
import { PokemonDto } from '../dto/pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly pokeApiRepository: PokeApiRepository) {}

  async findAll(page: number = 1, size: number = 20): Promise<PokemonDto[]> {
    const pokemonList = await this.pokeApiRepository.findAll();

    const newBasePokemon = this.resolvePagination(page, size, pokemonList);
    const pokemonArray = await Promise.all(
      newBasePokemon.map(
        async ({ name, url }) =>
          await this.pokeApiRepository.findPokemon(name, url),
      ),
    );

    const pokemonWithSpecies: PokemonDto[] = await Promise.all(
      pokemonArray.map(async (pokemon) => {
        const { name, url } = pokemon.species;
        const species = await this.pokeApiRepository.findPokemonSpecie(
          name,
          url,
        );

        return {
          ...pokemon,
          species,
        };
      }),
    );

    return pokemonWithSpecies;
  }

  private resolvePagination(page: number, size: number, array: BasePokemon[]) {
    const start = (page - 1) * size;
    const end = page * size;
    return [...array].slice(start, end);
  }
}
