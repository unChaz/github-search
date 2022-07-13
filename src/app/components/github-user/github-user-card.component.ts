import { Component, Input, OnInit } from '@angular/core';
import { GitHubService } from "@app/services/github.service";
import { SearchParams } from "@models/search-params";
import { GitHubUserResponse } from "@models/github-user-response";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { debounceTime, Subject } from "rxjs";
import { GitHubUser } from "@models/github-user";

@Component({
  selector: 'github-user-card',
  templateUrl: './github-user-card.component.html',
  styleUrls: ['./github-user-card.component.scss']
})
export class GitHubUserCard {
  @Input()
  user: GitHubUser;

  constructor() { }
}
