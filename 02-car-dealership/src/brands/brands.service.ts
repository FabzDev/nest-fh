import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid} from 'uuid'

@Injectable()
export class BrandsService {

    private brands: Brand[] = [
        {
            id: uuid(),
            name: "byd",
            createdAt: new Date().getTime(),
        }
    ]

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto
    const newBrand: Brand = {
        id: uuid(),
        name: name.toLowerCase(),
        createdAt: new Date().getTime(),
    }
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const foundBrand = this.brands.find( brand => brand.id === id);
    if (!foundBrand)
        throw new NotFoundException(`The id ${id} was not found`)
    return foundBrand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brandFound = this.findOne(id);
    this.brands =  this.brands.map( brand => {
        if(brand.id === id){
            brand = {...brandFound, name: updateBrandDto.name, updatedAt: new Date().getTime()}
        }
        return brand;
    })
    return this.brands;
  }

  remove(id: string) {
    this.brands = this.brands.filter( brand => brand.id != id);
    return this.brands;
  }
}
