export class GitHubUser {
  id: number;
  login: string;
  avatarUrl: string;
  gravatarId: string;
  url: string;
  htmlUrl: string;
  followersUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  reposUrl: string;
  receviedEventsUrl: string;
  score: number;
  followingUrl: string;
  gistsUrl: string;
  starredUrl: string;
  eventsUrl: string;
  siteAdmin: boolean;

  constructor(params?: Partial<GitHubUser>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
