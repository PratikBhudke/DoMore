import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  features = [
    {
      title: 'Todo List',
      description: 'Manage your tasks with priorities and due dates. Stay organized and track your progress.',
      icon: 'fas fa-tasks',
      route: '/todo'
    },
    {
      title: 'Money Tracker',
      description: 'Take control of your finances. Track expenses, income, and monitor your financial health.',
      icon: 'fas fa-money-bill-wave',
      route: '/moneytracker'
    },
    {
      title: 'Weather Updates',
      description: 'Get real-time weather updates and forecasts for your location. Plan your day with confidence.',
      icon: 'fas fa-cloud-sun',
      route: '/weather'
    },
    {
      title: 'Event Planner',
      description: 'Organize your events and meetings efficiently. Never miss an important date.',
      icon: 'fas fa-calendar-alt',
      route: '/event-planner'
    }
  ];

  team = [
    {
      name: 'Pratik Bhudke',
      role: 'Creater',
      bio: 'Try to implement new ideas and make them work',
      image: 'assets/team/john.jpg',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
  ];

  mission = {
    title: 'Our Mission',
    description: 'At DoMore, we believe in empowering individuals to achieve more by providing intuitive tools that simplify daily tasks and boost productivity. Our mission is to help you organize your life, track your goals, and make every day more productive.'
  };

  values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries to create cutting-edge solutions.',
      icon: 'fas fa-lightbulb'
    },
    {
      title: 'Simplicity',
      description: 'We believe in making complex tasks simple and accessible.',
      icon: 'fas fa-feather'
    },
    {
      title: 'Security',
      description: 'Your data security and privacy are our top priorities.',
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'User-Centric',
      description: 'Every feature is designed with our users in mind.',
      icon: 'fas fa-users'
    }
  ];

  getFeatureRoute(title: string): string {
    const feature = this.features.find(f => f.title === title);
    return feature ? feature.route : '/';
  }
}
