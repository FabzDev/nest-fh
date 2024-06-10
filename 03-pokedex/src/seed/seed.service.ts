import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreatePokemonDto } from 'src/pokemons/dto/create-pokemon.dto';
import { PokemonResponse } from 'src/pokemons/interfaces/poke-response.interface';
import { PokemonsService } from 'src/pokemons/pokemons.service';

@Injectable()
export class SeedService {
  
  private readonly myAxios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonsService){}

  async executeSeed() {
    const result = await this.myAxios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');
    const { data } = result
    data.results.forEach(({name, url}) => {
        const segments = url.split('/')
        const no = +segments[segments.length - 2]
        const pokemonDTO: CreatePokemonDto = { name, no }
        return this.pokemonService.create(pokemonDTO);
    })
  }
}
