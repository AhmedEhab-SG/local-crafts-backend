import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/mongo/schemas/product.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { User } from 'src/mongo/schemas/user.schema';
import { PaginatedDto } from 'src/shared/dtos/paginated.dto';
import { PaginateUtils } from 'src/shared/utils/paginate.utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productsModel: Model<Product>,
  ) {}

  async find(page: number, limit: number): Promise<PaginatedDto<Product>> {
    const products = await this.productsModel
      .find()
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    const itemCount = await this.productsModel.countDocuments();

    if (!products.length) throw new NotFoundException('No products found');

    const paginateUtils = PaginateUtils.getInstance();

    return new PaginatedDto<Product>(
      products.map(paginateUtils.convert),
      page,
      limit,
      itemCount,
    );
  }

  async findByUserId(_id: string): Promise<Product[]> {
    const products = await this.productsModel.find({ 'vendor.id': _id }).exec();

    if (!products.length)
      throw new NotFoundException('No products found by this id');

    return products;
  }

  async findById(_id: string): Promise<Product> {
    const product = await this.productsModel.findOne({ _id }).exec();

    if (!product) throw new NotFoundException('No product found by this id');

    return product;
  }

  async create(
    product: CreateProductDto,
    user_id: string,
    vendor: User,
  ): Promise<Product> {
    const newProduct = await this.productsModel.create({
      ...product,
      vendor: {
        id: user_id,
        name: vendor.name,
        gov: vendor.address.gov,
        city: vendor.address.city,
      },
    });

    return newProduct;
  }

  async update(
    _id: string,
    product: UpdateProductDto,
    reqUserId: string,
  ): Promise<Product> {
    let query: object = { _id };
    if (reqUserId !== 'admin') query = { ...query, 'vendor.id': reqUserId };

    const updatedProduct = await this.productsModel.findOneAndUpdate(
      query,
      { ...product, _id },
      { new: true },
    );

    if (!updatedProduct)
      throw new NotFoundException(
        `No product ${query['vendor.id'] ? 'you owns ' : ''}found by this id`,
      );

    return updatedProduct;
  }

  async delete(_id: string, reqUserId: string): Promise<Product> {
    let query: object = { _id };
    if (reqUserId !== 'admin') query = { ...query, 'vendor.id': reqUserId };

    const deleteddProduct = await this.productsModel.findOneAndDelete(query);

    if (!deleteddProduct)
      throw new NotFoundException(
        `No product ${query['vendor.id'] ? 'you owns ' : ''}found by this id`,
      );

    return deleteddProduct;
  }
}
