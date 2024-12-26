import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.userService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          if (response && response.user && response.user.id) {
            this.userService.setLoggedUserId(response.user.id);
            this.router.navigate(['/catalog']); // Redirect to catalog page after successful login
          } else {
            this.errorMessage = 'Invalid response from server';
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      });
    } else {
      this.errorMessage = 'Please enter both email and password.';
    }
  }

  isFormValid(): boolean {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }
}

