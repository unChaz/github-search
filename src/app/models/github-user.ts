export class GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  score: number;
  name: string;
  company: string;
  location: string;
  bio: string;
  email: string;
  followers: number;
  following: number;
  created_at: Date;
  public_repos: number;

  constructor(params?: Partial<GitHubUser>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
