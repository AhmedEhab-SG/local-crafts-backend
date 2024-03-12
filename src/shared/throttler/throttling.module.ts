import { ThrottlerModule } from '@nestjs/throttler';
import { Global, Module } from '@nestjs/common';

const rootModule = ThrottlerModule.forRoot([
  { name: 'default', ttl: 1000, limit: 3 },
])

@Global()
@Module({
  imports: [rootModule],
  exports: [rootModule]
})
export class ThrottlingModule { }
