export class SearchParams {
  query: string;
  sort: string;
  order: string;
  perPage: number;
  page: number;

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
