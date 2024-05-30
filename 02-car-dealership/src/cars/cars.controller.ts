import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    constructor(
        private carsService: CarsService
    ){

    }

    @Get()
    getAllCars(){
        return this.carsService.getCars();
    }

    @Get(':id')
    getCarById( @Param('id') id ){
        return this.carsService.getCar(id);
    }

    @Post()
    createNewCar(@Body() newCar){
        this.carsService.createCar(newCar)
        return newCar;
    }

    @Patch()
    updateACar(@Body() car){
        return this.carsService.updateCar(car)
    }

    @Delete(':id')
    deleteCar( @Param('id') id ){
        return this.carsService.deleteCar(id)
    }
}
