import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../utility/services/movies.service';
import { Movie } from '../../utility/models/movie';
import { CommonModule } from '@angular/common';
import { DataService } from '../../utility/services/data.service';

@Component({
  selector: 'app-movie-info',
  imports: [CommonModule],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.css'
})
export class MovieInfoComponent implements OnInit {
  id: string = '';
  movie!: Movie;
  constructor(private route: ActivatedRoute,private dataService: DataService) {}
  ngOnInit(){
    this.id=this.route.snapshot.paramMap.get('id') || '';
    console.log('Movie ID from route:', this.id);
    if(this.id){
      this.fetchMovieDetails();
    }
  }

  fetchMovieDetails() {
    this.dataService.subject$.subscribe(movies => {
      const foundMovie = movies.find(m => m.id === this.id);
      if (foundMovie) {
        this.movie = foundMovie;
      } else {
        console.warn(`Movie with ID ${this.id} not found in data service.`);
      }
    });
  }
}
