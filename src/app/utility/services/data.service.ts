import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  subject = new BehaviorSubject<Movie[]>([]);
  subject$ = this.subject.asObservable();
  constructor() { }
  getData(data: Movie[]) {
    this.subject.next(data);
  }
}
