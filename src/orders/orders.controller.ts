import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/mongo/schemas/orders.schema';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ParseIsInPipe } from 'src/shared/pipes/parseIsIn.pipe';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';

const ParseValidSection = new ParseIsInPipe(['services', 'products']);

@Controller('')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('orders')
  @Roles(['admin', 'customer', 'vendor'])
  async allOrders(@Request() req: any): Promise<Order[]> {
    if (req.role === 'admin') return this.orderService.getAll();

    const options = {};
    options[req.role] = req.user_id;
    return this.orderService.getAll(options);
  }

  @Get('orders/:id')
  @Roles(['admin', 'customer', 'vendor'])
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<Order> {
    return this.orderService.getOne(id);
  }

  @Post('/:section/:id/order')
  @Roles(['customer'])
  async create(
    @Request() req: any,
    @Param('section', ParseValidSection) s: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() orderData: CreateOrderDto,
  ): Promise<Order> {
    orderData['customer'] = req.user_id;
    orderData[s.slice(0, s.length - 1)] = id;
    return this.orderService.create(orderData as Order);
  }

  @Delete('orders/:id')
  @Roles(['admin', 'customer', 'vendor'])
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
    @Request() req: any,
  ): Promise<any> {
    const options = {};
    options[req.role] = req.user_id;
    if (req.role === 'admin') delete options[req.user_role];

    return this.orderService.delete(id, options);
  }
}
