import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isUserDropdownOpen = false;
  currentUser: User | null = null;
  private authSubscription: Subscription | null = null;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isUserDropdownOpen = false;
    }
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  // Close dropdowns when clicking outside
  closeDropdowns() {
    this.isUserDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeDropdowns();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
    this.closeDropdowns();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
    this.closeDropdowns();
  }
}
