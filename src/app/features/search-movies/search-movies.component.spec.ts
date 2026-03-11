import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMoviesComponent } from './search-movies.component';

describe('SearchMoviesComponent', () => {
  let component: SearchMoviesComponent;
  let fixture: ComponentFixture<SearchMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit searchChanged when onSearch is called', () => {
  const emitted: string[] = [];
  component.searchChanged.subscribe((term) => emitted.push(term));

  component.searchTerm = 'batman';
  component.onSearch();

  expect(emitted).toEqual(['batman']);
});

it('should push term into searchSubject when onInputChange is called', () => {
  spyOn(component.searchSubject, 'next');

  component.searchTerm = 'joker';
  component.onInputChange();

  expect(component.searchSubject.next).toHaveBeenCalledWith('joker');
});
});
