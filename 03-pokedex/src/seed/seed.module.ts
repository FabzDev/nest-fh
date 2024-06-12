import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { CommonModule } from 'src/common/common.module';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService, AxiosAdapter],
  imports: [PokemonsModule, CommonModule]
})
export class SeedModule {}
