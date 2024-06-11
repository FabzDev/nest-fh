import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemons/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { PokemonResponse } from 'src/pokemons/interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private pokeModel = Model<Pokemon>,

    private httpAdapter: AxiosAdapter
  ) {}

  async executeSeed() {
    await this.pokeModel.deleteMany({});
    const data  = await this.httpAdapter.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonsToInsert: { no: number; name: string }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      const pokemonDTO: CreatePokemonDto = { name, no };
      pokemonsToInsert.push(pokemonDTO);
    });
    this.pokeModel.insertMany(pokemonsToInsert);

    return 'Seed Executed';
  }
}
