import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegistering = false;
  errorMessage: string = '';
  returnUrl: string = '/home';
  
  // Password visibility flags
  showLoginPassword = false;
  showRegisterPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    // Check route data to see if we should show registration form
    this.route.data.subscribe(data => {
      if (data['showRegister']) {
        this.isRegistering = true;
      }
    });

    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  private initializeForms() {
    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Initialize registration form
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator for password match
  private passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  // Toggle between login and registration forms
  toggleForm(isRegistering: boolean) {
    this.isRegistering = isRegistering;
    this.errorMessage = '';
  }

  // Getters for login form
  get loginEmail() {
    return this.loginForm.get('email');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }

  // Getters for registration form
  get name() {
    return this.registerForm.get('name');
  }

  get registerEmail() {
    return this.registerForm.get('email');
  }

  get registerPassword() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // Password visibility toggles
  toggleLoginPasswordVisibility() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleRegisterPasswordVisibility() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Form submissions
  onSubmit() {
    if (this.isRegistering) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Registration successful');
          this.router.navigate(['/events']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful');
          this.router.navigate(['/events']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  // Social login methods
  loginWithGoogle() {
    console.log('Google login clicked');
    // Implement Google login
  }

  loginWithFacebook() {
    console.log('Facebook login clicked');
    // Implement Facebook login
  }

  loginWithGithub() {
    console.log('Github login clicked');
    // Implement Github login
  }
}
