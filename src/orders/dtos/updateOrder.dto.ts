import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createOrder.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
