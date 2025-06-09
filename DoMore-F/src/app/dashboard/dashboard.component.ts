import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  apps = [
    {
      title: 'Todo List',
      icon: 'fas fa-tasks',
      description: 'Manage your tasks with priorities and due dates. Stay organized and track your progress.',
      route: '/todo',
      color: '#4942E4'
    },
    {
      title: 'Money Tracker',
      icon: 'fas fa-money-bill-wave',
      description: 'Track your expenses and income. Monitor your financial health with detailed reports.',
      route: '/moneytracker',
      color: '#11009E'
    },
    {
      title: 'Weather',
      icon: 'fas fa-cloud-sun',
      description: 'Check current weather conditions and 5-day forecast for your city.',
      route: '/weather',
      color: '#8696FE'
    },
    {
      title: 'Event Planner',
      icon: 'fas fa-calendar-alt',
      description: 'Plan and manage your events with ease. Keep track of important dates and schedules.',
      route: '/event-planner',
      color: '#C539B4'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
    }
  }

  navigateToApp(route: string) {
    this.router.navigate([route]);
  }
} 