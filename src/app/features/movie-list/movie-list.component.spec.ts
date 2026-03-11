import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesService } from '../../utility/services/movies.service';
import { Router } from '@angular/router';
import { Movie } from '../../utility/models/movie';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [provideHttpClient(),provideHttpClientTesting(),MoviesService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call scrollToIndex with a valid index when gotToScrollIndex() is called', () => {
    const fakeViewport = {
      getDataLength: () => 10,
      scrollToIndex: jasmine.createSpy('scrollToIndex')
    } as any;
    component.viewport = fakeViewport;
    spyOn(Math, 'random').and.returnValue(0.25);
    component.gotToScrollIndex();
    const expectedIndex = Math.floor(0.25 * 10) + 1;
    expect(fakeViewport.scrollToIndex).toHaveBeenCalledWith(expectedIndex);
  });
  it('should call getFilteredMovies with the search term and set filteredMovies', () => {
    const searchTerm = 'batman';
    const fakeFiltered$ = { subscribe: () => {} } as any;
    spyOn(component, 'getFilteredMovies').and.returnValue(fakeFiltered$);
    component.onSearchChanged(searchTerm);
    expect(component.getFilteredMovies).toHaveBeenCalledWith(searchTerm);
    expect(component.filteredMovies).toBe(fakeFiltered$);
  });
  it('should navigate to movie detail on movie click', () => {
  const movie = { id: '123' } as Movie;
  const router = TestBed.inject(Router);
  spyOn(router, 'navigate');
  component.onMovieClick(movie);
  expect(router.navigate).toHaveBeenCalledWith(['/movie', movie.id]);
});
});
