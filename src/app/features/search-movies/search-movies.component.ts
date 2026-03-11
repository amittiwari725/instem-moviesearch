import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-movies',
  imports: [FormsModule,CommonModule],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent implements OnInit {
  searchTerm: string = '';
  searchSubject = new Subject<string>();
  @Output() searchChanged = new EventEmitter<string>();

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(500),distinctUntilChanged()).subscribe((term) => {
      this.searchChanged.emit(term);
    });
  }

  onSearch() {
    this.searchChanged.emit(this.searchTerm);
  }
  onInputChange() {
    this.searchSubject.next(this.searchTerm);
  }
}
