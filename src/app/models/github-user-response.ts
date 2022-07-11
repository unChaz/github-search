import { GitHubUser } from "@models/github-user";

export class GitHubUserResponse {
  totalCount: number;
  users: GitHubUser[];

  constructor(users: GitHubUser[], total_count: number) {
    this.users = users;
    this.totalCount = total_count;
  }
}
