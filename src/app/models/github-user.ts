export class GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  recevied_events_url: string;
  score: number;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  site_admin: boolean;

  constructor(params?: Partial<GitHubUser>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
