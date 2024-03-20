import {
  Body,
  Controller,
  Post,
  Request,
  Param,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ParseIsInPipe } from 'src/shared/pipes/parseIsIn.pipe';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { CreateFeedbackDto } from './dtos/createFeedback.dto';
import { Feedback } from 'src/mongo/schemas/feedback.schema';

const ParseValidSection = new ParseIsInPipe(['services', 'products']);

@Controller('')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/:section/:id/feedback')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('section', ParseValidSection) s: string,
  ): Promise<Feedback[]> {
    const options = {};
    options[s.slice(0, -1)] = id;
    return this.feedbackService.find(options);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['customer'])
  @Post('/:section/:id/feedback')
  async create(
    @Request() req: any,
    @Param('section', ParseValidSection) s: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() feedbackData: CreateFeedbackDto,
  ): Promise<Feedback> {
    feedbackData['customer'] = req.user_id;
    feedbackData[s.slice(0, -1)] = id;
    return this.feedbackService.create(feedbackData as Feedback);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin', 'customer'])
  @Delete('/:section/:id/feedback')
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('section', ParseValidSection) s: string,
    @Request() req: any,
  ): Promise<any> {
    const options = {};
    options[s.slice(0, -1)] = id;
    options[req.role] = req.user_id;
    if (req.role === 'admin') delete options[req.user_role];
    return this.feedbackService.remove(options);
  }
}
