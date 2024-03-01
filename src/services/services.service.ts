import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Service } from 'src/mongo/schemas/services.schema';
import { CreateServiceDto } from './dtos/createService.dto';
import { UpdateServiceDto } from './dtos/updateService.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private servicesModule: Model<Service>,
  ) {}

  async find(): Promise<Service[]> {
    const allServices = await this.servicesModule.find().exec();

    if (!allServices.length) throw new NotFoundException('No services found');

    return allServices;
  }
  async findById(_id: ObjectId): Promise<Service> {
    const Service = await this.servicesModule.findOne({ _id }).exec();

    if (!Service) throw new NotFoundException('No Service found by this id');

    return Service;
  }

  async create(Service: CreateServiceDto): Promise<Service> {
    const newservice = await this.servicesModule.create(Service);

    return newservice;
  }

  async update(_id: ObjectId, Service: UpdateServiceDto): Promise<Service> {
    const updatedService = await this.servicesModule.findByIdAndUpdate(
      { _id },
      { ...Service, _id },
    );

    if (!updatedService)
      throw new NotFoundException('No Service found by this id');

    return await this.servicesModule.findOne({ _id });
  }

  async delete(_id: ObjectId): Promise<Service> {
    const deletedService = await this.servicesModule.findByIdAndDelete({
      _id,
    });

    if (!deletedService)
      throw new NotFoundException('No Service found by this id');

    return deletedService;
  }
}
