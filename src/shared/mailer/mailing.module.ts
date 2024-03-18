import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from '@nestjs/common';
import { MailingService } from "./mailing.service";

export const MailerRootModule = MailerModule.forRoot({
  transport: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_HOST_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  }
});

@Global()
@Module({
  imports: [MailerRootModule],
  providers: [MailingService],
  exports: [MailingService]
})
export class MailingModule {}
