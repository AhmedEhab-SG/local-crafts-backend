import { User, UserSchema } from "../schemas/user.schema";
import { MongooseModule } from '@nestjs/mongoose';

export const UserModel = MongooseModule.forFeatureAsync([{
  name: User.name, useFactory: () => UserSchema,
}])

/*
@Module({
  imports: [CollectionModel],
  exports: [CollectionModel]
})
export class UserModel { }
*/
