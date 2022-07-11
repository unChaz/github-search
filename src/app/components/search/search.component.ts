import { Component, OnInit } from '@angular/core';
import { GitHubService } from "@app/services/github.service";
import { SearchParams } from "@models/search-params";
import { GitHubUserResponse } from "@models/github-user-response";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  currentQuery: string;
  params: SearchParams;
  searchResults: GitHubUserResponse;
  error: any; // TODO: Create error model

  constructor(
    private githubService: GitHubService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.params = new SearchParams(this.activatedRoute.snapshot.queryParams);
    if (this.params.query.length > 0) {
      // There's a query in the URL query params
      this.search();
    }
  }

  search(): void {
    this.setUrlQueryParams();
    this.currentQuery = this.params.query; // So the message doesn't change when the query input changes.
    this.githubService.search(this.params).subscribe((response: any) => {
      this.params.query = "";
      this.searchResults = response;
    }, (error) => {
      this.error = error;
    });
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
