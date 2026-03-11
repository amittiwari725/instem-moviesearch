import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoComponent } from './movie-info.component';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Movie } from '../../utility/models/movie';
import { Subject } from 'rxjs';
import { DataService } from '../../utility/services/data.service';

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;
  let mockDataService: { subject$: Subject<Movie[]> };

  beforeEach(async () => {
    mockDataService = { subject$: new Subject<Movie[]>() };
    await TestBed.configureTestingModule({
      imports: [MovieInfoComponent],
      providers: [provideRouter([]),
                  provideHttpClient(),
                  provideHttpClientTesting(),
                  { provide: DataService, useValue: mockDataService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set movie when dataService subject emits a matching movie', () => {
  const movies = [{ id: '123', Title: 'Test' }] as Movie[];
  component.id = '123';

  component.fetchMovieDetails();
  mockDataService.subject$.next(movies);

  expect(component.movie).toEqual(movies[0]);
});

it('should warn when movie id is not found in emitted list', () => {
  const movies = [{ id: '999', Title: 'Other' }] as Movie[];
  component.id = '123';
  spyOn(console, 'warn');
  
  component.fetchMovieDetails();
  mockDataService.subject$.next(movies);

  expect(console.warn).toHaveBeenCalledWith('Movie with ID 123 not found in data service.');
  expect(component.movie).toBeUndefined();
});
});
