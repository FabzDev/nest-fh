import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokeModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokeModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Pokemon exists in DB.  ' + JSON.stringify(error.keyValue),
        );
      }
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all pokemons`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if( !isNaN(+term))
        pokemon = await this.pokeModel.findOne({ no: term });

    if( !pokemon && isValidObjectId(term) )
        pokemon = await this.pokeModel.findById(term);

    if( !pokemon )
        pokemon = await this.pokeModel.findOne({ name: term.toLowerCase().trim() });

    if( !pokemon)
        throw new NotFoundException("The pokemon was not found with the id/no/name: " + term);

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
