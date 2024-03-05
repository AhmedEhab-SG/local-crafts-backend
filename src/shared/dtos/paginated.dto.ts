import { PageMetaDto } from './pageMeta.dto';

export class PaginatedDto<T> {
  data: T[];

  meta: PageMetaDto;

  constructor(data: T[], page: number, limit: number, itemCount: number) {
    this.data = data;
    this.meta = new PageMetaDto(page, limit, itemCount);
  }
}
