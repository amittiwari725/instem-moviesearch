import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SearchMoviesComponent } from '../search-movies/search-movies.component';
import { Movie } from '../../utility/models/movie';
import { MoviesService } from '../../utility/services/movies.service';
import { CommonModule } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { map, Observable } from 'rxjs';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Router } from '@angular/router';
import { DataService } from '../../utility/services/data.service';

@Component({
  selector: 'app-movie-list',
  imports: [SearchMoviesComponent, CommonModule,ScrollingModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  // allMovies: Movie[] = [];
  // filteredMovies: Movie[] = [];
  filteredMovies!: Observable<Movie[]>;
  // itemSize = 50;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  isLoading=false;
  currentPage=0;
  itemsPerPage=12;
  toggleLoading = ()=>this.isLoading=!this.isLoading;
  constructor(private movieService: MoviesService, private route: Router,private dataService: DataService) {
    this.filteredMovies = this.movieService.getMovies()
  }
  
  ngOnInit() {
    
  }

idTrackFn = (index: number, movie: Movie) => movie.id;
currentIndex(index: number) {
    // console.log('currentIndex', index);
  }

  gotToScrollIndex() {
    this.viewport.scrollToIndex(Math.floor(Math.random() * this.viewport.getDataLength()) + 1  );
  }
  onSearchChanged(searchTerm: string) {
    this.filteredMovies = this.getFilteredMovies(searchTerm);
    // console.log('Search term changed:', searchTerm);
  }
  getFilteredMovies(searchTerm: string): Observable<Movie[]> {
    return this.movieService.getMovies().pipe(
      map(data => {
        // console.log('Data received in getFilteredMovies:', data);
        let filtered = data.filter(m => (m.Title+"").toLowerCase().includes(searchTerm.toLowerCase()));
        return filtered;
      })
    );
  }
  onMovieClick(movie: Movie) {
    this.route.navigate(['/movie', movie.id]);
  }
}

