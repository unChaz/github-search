import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SearchParams } from "@models/search-params";
import { environment } from "@app/../environments/environment";
import { forkJoin, Observable } from "rxjs";
import { GitHubUserResponse } from "@models/github-user-response";
import { GitHubUser } from "@models/github-user";

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

  search(params: SearchParams): Observable<GitHubUserResponse> {
    const uri = `${this.endpoint}?${params.toQueryString()}`;
    return new Observable<GitHubUserResponse>((subscriber) => {
      this.httpClient.get<any>(uri, { headers: this.headers }).subscribe((response) => {
        forkJoin(response.items.map((user: GitHubUser) => {
          return this.getUser(user.login);
        })).subscribe((data: any) => {
          subscriber.next(new GitHubUserResponse(data, response.total_count));
        });
      })
    })
  }

  getUser(username: string): Observable<GitHubUser> {
    const uri = `https://api.github.com/users/${username}`;
    return this.httpClient.get<any>(uri, { headers: this.headers });
  }
}
