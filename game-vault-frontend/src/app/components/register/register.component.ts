import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Register</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" [(ngModel)]="username" name="username" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" [(ngModel)]="email" name="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" [(ngModel)]="password" name="password" required>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="confirmPassword" [(ngModel)]="confirmPassword" name="confirmPassword" required>
          </div>
          <button type="submit" class="btn btn-primary w-100" [disabled]="!isFormValid()">Register</button>
        </form>
        <div *ngIf="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
        <div *ngIf="successMessage" class="alert alert-success mt-3">
          {{ successMessage }}
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.userService.register(this.username, this.email, this.password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.successMessage = 'Registration successful! You can now log in.';
          this.errorMessage = '';
          this.router.navigate(['/']);
          // Reset form fields
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
          alert('Registration failed. Please try again.');
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
      alert('Please fill all fields correctly.');
    }
  }

  isFormValid(): boolean {
    return this.username.trim() !== '' &&
           this.email.trim() !== '' &&
           this.password.trim() !== '' &&
           this.password === this.confirmPassword;
  }
}

