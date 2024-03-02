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

  getAllCities() {
    return this.cityModel.find().populate('gov', { name: 1 });
  }
  getCitiesByGov(gov: string) {
    return this.cityModel.find({ gov });
  }

  addGovernorates(names: string[]) {
    names = [...new Set(names)];
    const govDocs = names.map(name => { return { name } });
    return this.govModel.insertMany(govDocs, {ordered: false});
  }

  addCities(govId: string, cities: string[]) {
    cities = [...new Set(cities)];
    const cityDocs = cities.map(city => { return { name: city, gov: govId } });
    return this.cityModel.insertMany(cityDocs, {ordered: false});
  }

  deleteGov(id: string) {
    this.cityModel.deleteMany({ gov: id });
    return this.govModel.findByIdAndDelete(id);
  }

  deleteCity(id: string) {
    return this.cityModel.findByIdAndDelete(id);
  }
}
