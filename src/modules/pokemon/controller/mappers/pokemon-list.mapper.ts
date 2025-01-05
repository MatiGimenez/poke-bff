import { Injectable } from '@nestjs/common';
import { PokemonDto } from '../../dto/pokemon.dto';
import { TYPES } from '../../constants/types';
import { PokemonListResponseDto } from '@modules/pokemon/dto/pokemon-list-response.dto';
import { adjustColor } from '@common/utils/adjust-color';
import { COLORS, DEFAULT_COLOR } from '@modules/pokemon/constants/colors';

@Injectable()
export class PokemonListMapper {
  private prevColor: string;
  private countColor: number;

  constructor() {}

  transform(data: PokemonDto[]): PokemonListResponseDto[] {
    return data.map((pokemon) => {
      const color = COLORS[pokemon.species.color.name] || DEFAULT_COLOR;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map((type) => TYPES[type.type.name]),
        backgroundColor: this.resolveBackgroundColor(color),
      };
    });
  }

  private resolveBackgroundColor(color: string): string {
    if (this.prevColor === color) {
      this.countColor++;
      return adjustColor(color, -1 * (40 * this.countColor));
    } else {
      this.prevColor = color;
      this.countColor = 0;
      return color;
    }
  }
}
