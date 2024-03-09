import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from 'src/mongo/models/user.model';
import { MailerRootModule } from './mailer/mailerRoot.module';

@Module({
  imports: [UserModel, MailerRootModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
