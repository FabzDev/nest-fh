import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Mazda',
    model: '2',
  },
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Nissan',
    model: 'Verna',
  },
  {
    id: uuid(),
    brand: 'Kia',
    model: 'Sportage',
  },
  {
    id: uuid(),
    brand: 'Hyundai',
    model: 'Tucson',
  },
];
