import { MongooseModule } from "@nestjs/mongoose";
import { City, CitySchema } from "../schemas/city.schema";

export const CityModel = MongooseModule.forFeatureAsync([{
  name: City.name, useFactory: () => CitySchema,
}])
/*
@Module({
  imports: [CollectionModel],
  exports: [CollectionModel]
})
export class CityModel {}
*/
