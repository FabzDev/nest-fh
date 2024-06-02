import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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
        return this.carsService.createCar(newCar)
    }

    @Patch(':id')
    updateACar(@Param( 'id', ParseUUIDPipe ) id: string, @Body() updateCar: UpdateCarDto){
        return this.carsService.updateCar(id, updateCar)
    }

    @Delete(':id')
    deleteCar( @Param('id') id ){
        return this.carsService.deleteCar(id)
    }
}
