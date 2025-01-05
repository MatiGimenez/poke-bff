import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { PokemonListMapper } from './mappers/pokemon-list.mapper';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly pokemonListMapper: PokemonListMapper,
  ) {}

  @Get('/')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('size', new ParseIntPipe({ optional: true })) size: number,
  ) {
    try {
      const result = await this.pokemonService.findAll(page, size);

      return this.pokemonListMapper.transform(result);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
