import { Controller, Get, ImATeapotException, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQureyDto } from './dtos/searchQurey.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly serachService: SearchService) { }

  @Get()
  async getSearchQurey(@Query() { q }: SearchQureyDto): Promise<any> {
    return await this.serachService.search(q);
  }

  @Get('popular')
  async getPopularItems(@Query('limit') limit = 6): Promise<any> {
    return await this.serachService.popularItems(limit);
  }

  @Get('search/exact')
  serachWithExactText(@Query('q') q: string) {
    if (!q) throw new ImATeapotException('What are you looking for!');
    return this.serachService.searchExact(q);
  }
}
