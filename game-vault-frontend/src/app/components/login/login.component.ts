import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.setLoggedUserId('NA');
  }
  

  onSubmit() {
    if (this.isFormValid()) {
      this.userService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          if (response && response.user && response.user.id) {
            this.userService.setLoggedUserId(response.user.id);
            this.router.navigate(['/catalog']);
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

