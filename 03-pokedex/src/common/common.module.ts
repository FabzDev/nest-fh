import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({})
export class CommonModule {
    providers: [ AxiosAdapter ];
    exports:[ AxiosAdapter ];
}
