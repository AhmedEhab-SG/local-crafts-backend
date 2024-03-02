import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from 'src/mongo/schemas/city.schema';
import { Governorate } from 'src/mongo/schemas/gov.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Governorate.name) private govModel: Model<Governorate>,
  ) { }

  getAllGov() {
    return this.govModel.find();
  }

  getCitiesByGov(gov: string) {
    return this.cityModel.find({ gov });
  }

  addGovernorates(names: [string]) {
    const govDocs = names.map(name => new this.govModel({ name }));
    return this.govModel.insertMany(govDocs);
  }

  addCities(govId: string, cities: [string]) {
    const cityDocs = cities.map(city =>
      new this.cityModel({ name: city, gov: govId })
    );
    return this.cityModel.insertMany(cityDocs);
  }

  deleteGov(id: string) {
    return this.govModel.findByIdAndDelete(id);
  }

  deleteCity(id: string) {
    return this.cityModel.findByIdAndDelete(id);
  }
}
