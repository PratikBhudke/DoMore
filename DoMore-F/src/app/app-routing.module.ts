import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { MoneytrackerComponent } from './moneytracker/moneytracker.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { WeatherComponent } from './weather/weather.component';
import { EventPlannerComponent } from './event-planner/event-planner.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexpageComponent, 
    pathMatch: 'full',
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'register', 
    component: LoginComponent, 
    data: { showRegister: true },
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'moneytracker',
    component: MoneytrackerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event-planner',
    component: EventPlannerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'home', 
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { 
    path: 'about', 
    component: AboutUsComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
