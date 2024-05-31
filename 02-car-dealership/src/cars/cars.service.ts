import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid'
import { Car } from './interfaces/car.interface';

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

  createCar(newCar){
    this.cars.push(newCar)
  }

  updateCar(newCar){
    const index = this.cars.findIndex(actualCar => actualCar.id==newCar.id);
    const {id, model, brand} = newCar;
    this.cars[index] = {...this.cars[index], id, model, brand};
    return this.cars;
  }

  deleteCar(id){
    this.cars = {...this.cars.filter(car => car.id != id)};
    return this.cars;
  }
}
