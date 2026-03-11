import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'http://localhost:9000/data';
  constructor(private http: HttpClient) { }
  getMovies() {
    return this.http.get<Movie[]>(this.url).pipe(map(movies => movies.sort((a, b) => b.Year - a.Year)));
  }
}
