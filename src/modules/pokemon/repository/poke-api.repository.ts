import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map, tap } from 'rxjs';
import { BasePokemon, PokemonList } from '../model/pokemon-list.model';
import { Cache } from 'cache-manager';
import { Pokemon } from '../model/pokemon.model';
import { Specie } from '../model/pokemon-specie.model';

@Injectable()
export class PokeApiRepository {
  private readonly logger = new Logger(PokeApiRepository.name, {
    timestamp: true,
  });

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<BasePokemon[]> {
    const cacheKey = 'pokemon-list';

    try {
      const cachedData = await this.cacheService.get<BasePokemon[]>(cacheKey);

      if (cachedData) {
        this.logger.log(`Retrieving ${cachedData.length} pokemon from cache`);
        return cachedData;
      }

      return lastValueFrom(
        this.httpService
          .get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=10000')
          .pipe(
            map((resp) => resp.data.results),
            tap(async (results) => {
              this.logger.log(
                `Retrieving ${results.length} pokemon from poke-api`,
              );
              await this.cacheService.set(
                cacheKey,
                results,
                1000 * 60 * 60 * 24,
              );
            }),
          ),
      );
    } catch (err) {
      this.logger.error('Error in findAll Repository', err);
    }
  }

  async findPokemon(name: string, url: string): Promise<Pokemon> {
    const cacheKey = `pokemon-${name}`;

    try {
      const cachedPokemon = await this.cacheService.get<Pokemon>(cacheKey);

      if (cachedPokemon) {
        this.logger.log(`Retrieving pokemon from cache: ${name}`);
        return cachedPokemon;
      }

      return lastValueFrom(
        this.httpService.get<Pokemon>(url).pipe(
          map((resp) => {
            return resp.data;
          }),
          tap(async (pokemon) => {
            await this.cacheService.set(cacheKey, pokemon, 1000 * 60 * 60 * 24);
            this.logger.log(`Retrieving pokemon from poke-api: ${name}`);
          }),
        ),
      );
    } catch (err) {
      this.logger.error('Error in findPokemon Repository', err);
    }
  }

  async findPokemonSpecie(name: string, url: string): Promise<Specie> {
    const cacheKey = `specie-${name}`;

    try {
      const cachedSpecie = await this.cacheService.get<Specie>(cacheKey);

      if (cachedSpecie) {
        this.logger.log(`Retrieving specie from cache: ${name}`);
        return cachedSpecie;
      }

      return lastValueFrom(
        this.httpService.get<Specie>(url).pipe(
          map((resp) => resp.data),
          tap(async (specie) => {
            await this.cacheService.set(cacheKey, specie, 1000 * 60 * 60 * 24);
            this.logger.log(`Retrieving specie from poke-api: ${name}`);
          }),
        ),
      );
    } catch (err) {
      this.logger.error('Error in findPokemonSpecie Repository', err);
    }
  }
}
