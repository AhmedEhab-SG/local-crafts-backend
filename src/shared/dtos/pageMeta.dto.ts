export class PageMetaDto {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;

  constructor(page: number, limit: number, itemCount: number) {
    this.page = page;
    this.limit = limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = page > 1;
    this.hasNextPage = page < this.pageCount;
  }
}
