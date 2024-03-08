import {
  Get, Post, Patch, Delete,
  Controller, Param, Body,
  ParseArrayPipe, ConflictException,
  UseGuards,
} from '@nestjs/common';
import { MainCategoryDto } from './dtos/mainCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { CategoriesService } from './categories.service';
import { ParseIsInPipe } from 'src/shared/pipes/parseIsIn.pipe';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

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
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
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
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
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
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  updateCategory(
    @Param('section', ParseValidSection) section: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updates: UpdateCategoryDto
  ) {
    return this.categoriesService.updateCategory(id, updates, section);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  deleteCategory(
    @Param('section', ParseValidSection) section: string,
    @Param('id', ParseObjectIdPipe) id: string
  ) {
    return this.categoriesService.deleteCategory(id, section);
  }
}
