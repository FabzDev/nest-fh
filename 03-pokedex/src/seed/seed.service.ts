import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemons/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { PokemonResponse } from 'src/pokemons/interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly myAxios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private pokeModel = Model<Pokemon>,
  ) {}

  async executeSeed() {
    const result = await this.myAxios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );
    const { data } = result;
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      const pokemonDTO: CreatePokemonDto = { name, no };
      await this.pokeModel.create(pokemonDTO);
      });
    return "Seed Executed"
  }
}
