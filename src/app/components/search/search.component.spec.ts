import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { GitHubService } from "@app/services/github.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GitHubServiceMock } from "@app/mocks/github-service.mock";
import { ActivatedRouteMock } from "@app/mocks/activated-route.mock";
import { HttpClientModule } from "@angular/common/http";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
      ],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteMock() },
        { provide: GitHubService, useValue: new GitHubServiceMock() },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize instance variables', () => {
    expect(component.error).toBe("");
    expect(component.sortLabel).toBe("Best match");
    expect(component.displayResults).toBeFalse();
    expect(component.loading).toBeFalse();
  });

  describe('resetPagination', () => {
    beforeEach(() => {
      component.params.page = 25;
      component.resetPagination();
    });

    it('should set the page to 1', () => {
      expect(component.params.page).toBe(1);
    });
  });

  describe('setPerPage', () => {
    beforeEach(() => {
      component.params.page = 10;
      component.params.perPage = 5;
      component.setPerPage(5);
    });

    it('should set the perPage to 5', () => {
      expect(component.params.perPage).toBe(5);
    });

    it('should set the page to 1', () => {
      expect(component.params.page).toBe(1);
    });

    it('calls the search function', () => {
      expect(component.search).toHaveBeenCalled();
    });
  });
});
