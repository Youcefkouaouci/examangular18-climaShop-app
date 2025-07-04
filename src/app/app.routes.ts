import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ArticlesComponent } from './components/articles/articles.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: '**', redirectTo: '/accueil' },
];
