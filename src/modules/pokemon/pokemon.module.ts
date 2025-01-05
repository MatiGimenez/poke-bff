import { Module } from '@nestjs/common';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonService } from './service/pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { PokeApiRepository } from './repository/poke-api.repository';
import { PokemonListMapper } from './controller/mappers/pokemon-list.mapper';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService, PokeApiRepository, PokemonListMapper],
})
export class PokemonModule {}
