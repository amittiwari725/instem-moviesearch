import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MoviesService,
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should request movies and sort them descending by year', () =>{
    const mockMovies: Movie[] = [
      { id: '1', Title: 'A', Year: 1990 } as Movie,
      { id: '2', Title: 'B', Year: 2000 } as Movie,
      { id: '3', Title: 'C', Year: 1980 } as Movie,
    ];

    let response: Movie[] | undefined;
    service.getMovies().subscribe((movies) => {
      response = movies;
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);

    expect(response).toEqual([
      { id: '2', Title: 'B', Year: 2000 } as Movie,
      { id: '1', Title: 'A', Year: 1990 } as Movie,
      { id: '3', Title: 'C', Year: 1980 } as Movie,
    ]);
  })
});
