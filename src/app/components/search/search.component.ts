import { Component, OnInit } from '@angular/core';
import { GitHubService } from "@app/services/github.service";
import { SearchParams } from "@models/search-params";
import { GitHubUserResponse } from "@models/github-user-response";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  currentQuery: string;
  params: SearchParams;
  searchResults: GitHubUserResponse;
  error: string = "";
  sortLabel: string = "best match";
  loading = false;
  displayResults = false;

  constructor(
    private githubService: GitHubService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.params = new SearchParams(this.activatedRoute.snapshot.queryParams);
    this.search();

    //Clear the form if the route changes and query params are cleared.
    this.router.events.subscribe((event) => {
      const query = this.activatedRoute.snapshot.queryParams['query'];
      if (event instanceof NavigationEnd && !query) {
        this.params.query = "";
       this.displayResults = false;
      }
    });
  }

  search(): void {
    if (this.params.query && this.params.query.length > 0) {
      this.loading = true;
      this.setUrlQueryParams();
      this.currentQuery = this.params.query; // So the message doesn't change when the query input changes.
      this.githubService.search(this.params).subscribe((response) => {
        this.searchResults = response;
        this.loading = false;
        this.displayResults = this.searchResults.totalCount > 0;
      }, (response) => {
        this.error = response.error.message;
        this.loading = false;
        this.displayResults = false;
      });
    }
  }

  resetPagination(): void {
    this.params.page = 1;
  }

  setPerPage(perPage: number): void {
    this.params.perPage = perPage;
    this.params.page = 1;
    this.search();
  }

  setSort(label: string, params: Partial<SearchParams>): void {
    this.sortLabel = label;
    Object.assign(this.params, params);
    this.search();
  }

  private setUrlQueryParams(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.params,
        queryParamsHandling: 'merge'
      });
  }
}
