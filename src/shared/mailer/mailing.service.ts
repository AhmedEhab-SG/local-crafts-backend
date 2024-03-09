import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailingService {
  currentMails = {};
  constructor (private mailService: MailerService) { }

  async sendCode(email: string) {
    const code = Math.floor(15000 + Math.random() * 80000);
    this.currentMails[email] = code;
    const info = await this.mailService.sendMail({
      from: process.env.MAIL_SENDER,
      to: email,
      subject: 'Welcome to Local Crafts marketplace',
      text: 'To confirm your email, please use the following code: ' + code,
    })
    console.log(info);
  }

  validateCode(email: string, code: number) {
    const actual = this.currentMails[email];
    if (actual && actual === code) {
      delete this.currentMails[email];
      return true;
    }
    return false;
  }
}
