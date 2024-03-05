import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/mongo/schemas/service.schema';
import { CreateServiceDto } from './dtos/createService.dto';
import { UpdateServiceDto } from './dtos/updateService.dto';
import { User } from 'src/mongo/schemas/user.schema';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { PaginateUtils } from 'src/shared/utils/paginate.utils';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private servicesModel: Model<Service>,
  ) {}

  async find(page: number, limit: number): Promise<PaginatedDto<Service>> {
    const services = await this.servicesModel
      .find()
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const itemCount = await this.servicesModel.countDocuments();

    if (!services.length) throw new NotFoundException('No services found');

    const paginateUtils = PaginateUtils.getInstance();

    return new PaginatedDto<Service>(
      services.map(paginateUtils.convert),
      page,
      limit,
      itemCount,
    );
  }

  async findByUserId(_id: string): Promise<Service[]> {
    const services = await this.servicesModel.find({ 'vendor.id': _id }).exec();

    if (!services.length)
      throw new NotFoundException('No services found by this id');

    return services;
  }

  async findById(_id: string): Promise<Service> {
    const service = await this.servicesModel.findOne({ _id }).exec();

    if (!service) throw new NotFoundException('No Service found by this id');

    return service;
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
