import { Component, OnInit } from '@angular/core';
import { GitHubService } from "@app/services/github.service";
import { SearchParams } from "@models/search-params";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private params: SearchParams;

  constructor(
    private githubService: GitHubService
  ) { }

  ngOnInit(): void {
    this.params = new SearchParams();
  }
}
