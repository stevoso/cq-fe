import { Routes } from '@angular/router';
import { ChartComponent } from './pages/chart/chart.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: 'chart', component: ChartComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/chart', pathMatch: 'full' }
];
