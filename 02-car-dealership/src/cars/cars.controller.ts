import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars = ['Mazda', 'Renault', 'KIA'];
    @Get()
    getAllCars(): string[]{
        return this.cars;
    }

    @Get(':id')
    getCarById( @Param('id') id ){
        return this.cars[id];
    }
}
