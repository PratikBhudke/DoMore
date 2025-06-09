import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: false
})
export class HomepageComponent implements OnInit {
  activeTab: string = 'todos';
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getTabTitle(): string {
    switch (this.activeTab) {
      case 'todos':
        return 'Todo List';
      case 'moneytracker':
        return 'Money Tracker';
      case 'notes':
        return 'Notes';
      case 'calendar':
        return 'Calendar';
      default:
        return '';
    }
  }
}
