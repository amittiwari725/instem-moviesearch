import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'movies', pathMatch: 'full'},
    {path: 'movies', loadComponent: () => import('./features/movie-list/movie-list.component').then(m => m.MovieListComponent)},
    {path: 'movie/:id', loadComponent: () => import('./features/movie-info/movie-info.component').then(m => m.MovieInfoComponent)},
    {path: '**', redirectTo: 'movies'}
];
