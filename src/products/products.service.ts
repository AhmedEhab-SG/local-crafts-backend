import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/mongo/schemas/products.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productsModel: Model<Product>,
  ) {}

  async find(): Promise<Product[]> {
    const allProducts = await this.productsModel.find().exec();

    if (!allProducts.length) throw new NotFoundException('No products found');

    return allProducts;
  }
  async findById(_id: string): Promise<Product> {
    const product = await this.productsModel.findOne({ _id }).exec();

    if (!product) throw new NotFoundException('No product found by this id');

    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    // add vendor from guard
    const newProduct = await this.productsModel.create(product);

    return newProduct;
  }

  async update(_id: string, product: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productsModel.findByIdAndUpdate(
      { _id },
      { ...product, _id },
    );

    if (!updatedProduct)
      throw new NotFoundException('No product found by this id');

    return await this.productsModel.findOne({ _id });
  }

  async delete(_id: string): Promise<Product> {
    const deleteddProduct = await this.productsModel.findByIdAndDelete({
      _id,
    });

    if (!deleteddProduct)
      throw new NotFoundException('No product found by this id');

    return deleteddProduct;
  }
}
