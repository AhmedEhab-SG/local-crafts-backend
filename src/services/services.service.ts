import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/mongo/schemas/service.schema';
import { CreateServiceDto } from './dtos/createService.dto';
import { UpdateServiceDto } from './dtos/updateService.dto';
import { User } from 'src/mongo/schemas/user.schema';

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

  async findByUserId(_id: string): Promise<Service[]> {
    const products = await this.servicesModel.find({ vendor: _id }).exec();

    if (!products) throw new NotFoundException('No products found by this id');

    return products;
  }

  async findById(_id: string): Promise<Service> {
    const Service = await this.servicesModel.findOne({ _id }).exec();

    if (!Service) throw new NotFoundException('No Service found by this id');

    return Service;
  }

  async create(
    service: CreateServiceDto,
    user_id: string,
    vendor: User,
  ): Promise<Service> {
    const newservice = await this.servicesModel.create({
      ...service,
      vendor: {
        id: user_id,
        name: vendor.name,
        gov: vendor.address.gov,
        city: vendor.address.city,
      },
    });

    return newservice;
  }

  async update(
    _id: string,
    service: UpdateServiceDto,
    reqUserId: string,
  ): Promise<Service> {
    let query: object = { _id };
    if (reqUserId !== 'admin') query = { ...query, 'vendor.id': reqUserId };

    const updatedService = await this.servicesModel.findOneAndUpdate(
      query,
      { ...service, _id },
      { new: true },
    );

    if (!updatedService)
      throw new NotFoundException(
        `No service ${query['vendor.id'] ? 'you owns ' : ''}found by this id`,
      );

    return updatedService;
  }

  async delete(_id: string, reqUserId: string): Promise<Service> {
    let query: object = { _id };
    if (reqUserId !== 'admin') query = { ...query, 'vendor.id': reqUserId };

    const deletedService = await this.servicesModel.findOneAndDelete(query);

    if (!deletedService)
      throw new NotFoundException(
        `No service ${query['vendor.id'] ? 'you owns ' : ''}found by this id`,
      );

    return deletedService;
  }
}
