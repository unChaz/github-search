export class SearchParams {
  query: string;
  sort: string;
  order: string;
  perPage: number = 30;
  page: number = 1;

  constructor(params?: Partial<SearchParams>) {
    if (params) {
      Object.assign(this, params);
    }
  }

  toQueryString(): string {
    return [
      `q=${this.query}`,
      `sort=${this.sort}`,
      `order=${this.order}`,
      `per_page=${this.perPage}`,
      `page=${this.page}`,
    ].join("&");
  }
}
