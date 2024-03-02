import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Product } from 'src/mongo/schemas/products.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productsModule: Model<Product>,
  ) {}

  async find(): Promise<Product[]> {
    const allProducts = await this.productsModule.find().exec();

    if (!allProducts.length) throw new NotFoundException('No products found');

    return allProducts;
  }
  async findById(_id: ObjectId): Promise<Product> {
    const product = await this.productsModule.findOne({ _id }).exec();

    if (!product) throw new NotFoundException('No product found by this id');

    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    // add vendor from guard
    const newProduct = await this.productsModule.create(product);

    return newProduct;
  }

  async update(_id: ObjectId, product: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productsModule.findByIdAndUpdate(
      { _id },
      { ...product, _id },
    );

    if (!updatedProduct)
      throw new NotFoundException('No product found by this id');

    return await this.productsModule.findOne({ _id });
  }

  async delete(_id: ObjectId): Promise<Product> {
    const deleteddProduct = await this.productsModule.findByIdAndDelete({
      _id,
    });

    if (!deleteddProduct)
      throw new NotFoundException('No product found by this id');

    return deleteddProduct;
  }
}
