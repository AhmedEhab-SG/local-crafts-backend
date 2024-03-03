import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/mongo/schemas/services.schema';
import { CreateServiceDto } from './dtos/createService.dto';
import { UpdateServiceDto } from './dtos/updateService.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private servicesModel: Model<Service>,
  ) {}

  async find(): Promise<Service[]> {
    const allServices = await this.servicesModel.find().exec();

    if (!allServices.length) throw new NotFoundException('No services found');

    return allServices;
  }
  async findById(_id: string): Promise<Service> {
    const Service = await this.servicesModel.findOne({ _id }).exec();

    if (!Service) throw new NotFoundException('No Service found by this id');

    return Service;
  }

  async create(Service: CreateServiceDto): Promise<Service> {
    const newservice = await this.servicesModel.create(Service);

    return newservice;
  }

  async update(_id: string, Service: UpdateServiceDto): Promise<Service> {
    const updatedService = await this.servicesModel.findByIdAndUpdate(
      { _id },
      { ...Service, _id },
    );

    if (!updatedService)
      throw new NotFoundException('No Service found by this id');

    return await this.servicesModel.findOne({ _id });
  }

  async delete(_id: string): Promise<Service> {
    const deletedService = await this.servicesModel.findByIdAndDelete({
      _id,
    });

    if (!deletedService)
      throw new NotFoundException('No Service found by this id');

    return deletedService;
  }
}
