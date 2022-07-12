import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SearchParams } from "@models/search-params";
import { forkJoin, Observable } from "rxjs";
import { GitHubUserResponse } from "@models/github-user-response";
import { GitHubUser } from "@models/github-user";

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  // In order to obscure my API key from the front-end, I built a proxy using AWS Lambda and GatewayAPI.
  // The lambda function makes the request on behalf of the user with my API credentials.
  private endpoint: string = "https://mswek9he34.execute-api.us-east-1.amazonaws.com/github-search";

  constructor(
    private httpClient: HttpClient,
    ) { }

  search(params: SearchParams): Observable<GitHubUserResponse> {
    const uri = `${this.endpoint}/search?${params.toQueryString()}`;
    return new Observable<GitHubUserResponse>((subscriber) => {
      this.httpClient.get<any>(uri).subscribe((response) => {
        forkJoin(response.items.map((user: GitHubUser) => {
          return this.getUser(user.login);
        })).subscribe((data: any) => {
          subscriber.next(new GitHubUserResponse(data, response.total_count));
        });
      })
    })
  }

  getUser(username: string): Observable<GitHubUser> {
    const uri = `${this.endpoint}/users?username=${username}`;
    return this.httpClient.get<any>(uri);
  }
}
