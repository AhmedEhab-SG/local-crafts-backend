import { PartialType } from "@nestjs/mapped-types";
import { IsMongoId, IsOptional } from "class-validator";
import { MainCategoryDto } from "./mainCategory.dto";


export class UpdateCategoryDto extends PartialType(MainCategoryDto) {
  @IsOptional()
  @IsMongoId()
  parent: string;
}
