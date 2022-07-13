import { GitHubUserResponse } from "@models/github-user-response";
import { Observable } from "rxjs";
import { SearchParams } from "@models/search-params";
import { GitHubUser } from "@models/github-user";

export class GitHubServiceMock {
  index() {
    return {
      search: (params: SearchParams) => {
        return new Observable<GitHubUserResponse>((subscriber) => {
          subscriber.next(new GitHubUserResponse([], 0));
        })
      },
      getUser(username: string): Observable<GitHubUser> {
        return new Observable<GitHubUser>((subscriber) => {
          subscriber.next(new GitHubUser({ login: username }));
        });
      }
    };
  }
}
