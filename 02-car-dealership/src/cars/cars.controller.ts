import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
    constructor(
        private carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.getCars();
    }

    @Get(':id')
    getCarById( @Param('id', ParseUUIDPipe) id ){
        return this.carsService.getCar(id);
    }

    @Post()
    @UsePipes( ValidationPipe )
    createNewCar(@Body() newCar: CreateCarDto){
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
