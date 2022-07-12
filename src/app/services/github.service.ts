import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SearchParams } from "@models/search-params";
import { environment } from "@app/../environments/environment";
import { mergeMap } from "rxjs";
import { GitHubUserResponse } from "@models/github-user-response";

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private readonly headers: HttpHeaders;
  private endpoint: string = "https://api.github.com/search/users";

  constructor(
    private httpClient: HttpClient,
    ) {
    this.headers = new HttpHeaders({
      Accept: "application/vnd.github+json",
      Authorization: `token ${environment.githubToken}`
    });
  }

  search(params: SearchParams) {
    const uri = `${this.endpoint}?${params.toQueryString()}`;
    return this.httpClient.get<any>(uri, { headers: this.headers }).pipe(
      mergeMap(async (data) => {
        return new GitHubUserResponse(data.items, data.total_count);
      }
    ));
  }
}
