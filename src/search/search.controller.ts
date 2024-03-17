import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQureyDto } from './dtos/searchQurey.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly serachService: SearchService) {}

  @Get()
  async getSearchQurey(@Query() { q }: SearchQureyDto): Promise<any> {
    return await this.serachService.search(q);
  }
}
