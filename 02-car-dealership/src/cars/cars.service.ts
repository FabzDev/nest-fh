import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { error } from 'console';
// import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Mazda',
      model: '2',
    },
    {
      id: uuid(),
      brand: 'Renault',
      model: 'Logan',
    },
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Onix',
    },
  ];

  public getCars() {
    return this.cars;
  }

  getCar(id) {

    const car = this.cars.find(car => car.id == id);

    if (!car) throw new NotFoundException(`The id '${id}' does not exist`); 

    return car;
  }

  createCar(newCar: CreateCarDto){
    const car = {id: uuid(), ...newCar}
    this.cars.push(car)
    return car;
  }

  updateCar(idStr: string, updateCar: UpdateCarDto){
    const index = this.cars.findIndex(actualCar => actualCar.id==idStr);
    const {id, model, brand} = updateCar;
    this.cars[index] = {...this.cars[index], id:uuid(), model, brand};
    return this.cars;
  }

  deleteCar(id){
    const existCar = this.cars.filter(car => car.id == id)
    if(existCar.length == 0) throw new NotFoundException('The ID does not exist')
    this.cars = [...this.cars.filter(car => car.id != id)];
    return this.cars;
  }

  fillCarsWithSeed(cars: Car[]){
    this.cars = cars;
  }
}
