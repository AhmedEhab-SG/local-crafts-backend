import { MongooseModule } from "@nestjs/mongoose";
import { Governorate, GovSchema } from "../schemas/gov.schema";

export const GovModel = MongooseModule.forFeatureAsync([{
  name: Governorate.name, useFactory: () => GovSchema
}])

/*
import { Module } from "@nestjs/common";
const CollectionModel = MongooseModule.forFeatureAsync([{
  name: Governorate.name, useFactory: () => GovSchema
}])
@Module({
  imports: [CollectionModel],
  exports: [CollectionModel]
})
export class GovModel {}
*/
