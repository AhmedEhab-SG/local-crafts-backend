import {
  Get, Post, Patch, Delete,
  Controller, Param, Body,
  ParseArrayPipe, ConflictException,
} from '@nestjs/common';
import { MainCategoryDto } from './dtos/mainCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { CategoriesService } from './categories.service';
import { ParseIsInPipe } from 'src/shared/pipes/parseIsIn.pipe';

const ParseValidSection = new ParseIsInPipe(['services', 'products']);
@Controller(':section/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  getAllMainCategories(@Param('section', ParseValidSection) section: string) {
    return this.categoriesService.getAllMainCategories(section);
  }

  @Get(':id')
  getSubCategories(
    @Param('section', ParseValidSection) section: string,
    @Param('id', ParseObjectIdPipe) id: string
  ) {
    return this.categoriesService.getSubCategories(id, section);
  }

  @Post()
  async addMainCategory(
    @Param('section', ParseValidSection) section: string,
    @Body() body: MainCategoryDto
  ) {
    try {
      return await this.categoriesService.addMainCategory(body, section);
    } catch {
      throw new ConflictException('Category already exists');
    }
  }

  @Post(':parentId')
  async addSubCategories(
    @Param('section', ParseValidSection) section: string,
    @Param('parentId', ParseObjectIdPipe) id: string,
    @Body(ParseArrayPipe) names: string[]
  ) {
    try {
      return await this.categoriesService.addSubCategories(id, names, section);
    } catch (error) {
      throw new ConflictException({
        error: 'Conflict',
        statusCode: 409,
        message: 'some categories already exists',
        inserted: error.insertedDocs,
        failed: error.writeErrors?.map(e => e.err.op.name),
      });
    }
  }

  @Patch(':id')
  updateCategory(
    @Param('section', ParseValidSection) section: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updates: UpdateCategoryDto
  ) {
    return this.categoriesService.updateCategory(id, updates, section);
  }

  @Delete(':id')
  deleteCategory(
    @Param('section', ParseValidSection) section: string,
    @Param('id', ParseObjectIdPipe) id: string
  ) {
    return this.categoriesService.deleteCategory(id, section);
  }
}
