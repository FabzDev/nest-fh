import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemons`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) pokemon = await this.pokeModel.findOne({ no: term });

    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokeModel.findById(term);

    if (!pokemon)
      pokemon = await this.pokeModel.findOne({
        name: term.toLowerCase().trim(),
      });

    if (!pokemon)
      throw new NotFoundException(
        `The 'id'|'no'|'name': ${term} was not found in the DB`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

    try {
      const pokemon = await this.findOne(term);
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(term: string) {
    try {
        const pokemon = await this.findOne(term);
        await pokemon.deleteOne();
        return pokemon.toJSON();
    } catch (error) {
        this.handleExceptions(error);        
    }
  }

  private handleExceptions(error: any) {
    if (error.status === 404)
      throw new BadRequestException(
        `The 'id'|'no'|'name' was not found in the DB`,
      );

    if (error.code === 11000)
      throw new BadRequestException(
        `The 'id'|'no'|'name' is already used in the DB`,
      );

    console.log(error);
    throw new InternalServerErrorException(
      "Can't complete the request - Check server logs",
    );
  }
}
