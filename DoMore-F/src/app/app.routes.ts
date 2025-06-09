import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { MoneytrackerComponent } from './moneytracker/moneytracker.component';

export const routes: Routes = [
  { path: 'todo', component: TodoComponent },
  { path: 'expenses', component: MoneytrackerComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' }
]; 