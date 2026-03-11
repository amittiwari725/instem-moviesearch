import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { MoviesService } from './utility/services/movies.service';
import { DataService } from './utility/services/data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'movieSearch';
  constructor(private service: MoviesService,private dataService: DataService) {}
  ngOnInit(): void {
    this.service.getMovies().subscribe(data => {
      console.log('Movie data from API:', data);
      this.dataService.getData(data);
    })
  }
}
