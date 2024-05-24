import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  isLoginOption: boolean = true;
  userId: number | undefined;
  eml: string = '';
  pw: string = '';
  pw_confirm: string = '';
  isLoginError: boolean = false;
  loginErrorMessage: string = '';

  user: any; // Ensure the user property is properly initialized


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to currentUser$ observable to get the user data
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user; // Assign the emitted user data to the user property
      }
    });
  }

  authSubmit(formData: NgForm) {
    if (this.isLoginOption) {
      const loginData = {
        email: formData.value.email,
        password: formData.value.password,
      };
  
      this.authService.login(loginData).subscribe({
        next: (res) => {
          this.authService.authToken = res.data.token;
          this.authService.saveAuthToken();
          this.authService.getCurrentUser().subscribe({
            next: (user) => {
              this.authService.loginState = true;
              this.userId = user.id;
  
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 1000,
              });
  
              setTimeout(() => {
                this.router.navigateByUrl(`/user-profile/${this.userId}`);
              }, 1000);
            },
            error: (error) => {
              console.error('Error fetching current user:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch current user. Please try again.',
              });
            },
          });
        },
        error: (error) => {
          this.authService.loginState = false;
          this.isLoginError = true;
          if (error && error.error) {
            switch (error.error.status) {
              case 'INVALID_EMAIL':
                this.loginErrorMessage = 'User does not exist.';
                break;
              case 'INVALID_PASSWORD':
                this.loginErrorMessage = 'Incorrect password.';
                break;
              default:
                this.loginErrorMessage = 'Failed to login. Please try again later.';
                break;
            }
            setTimeout(() => (this.isLoginError = false), 5000);
          }
        },
      });
    } else {
      const signUpData = {
        ...formData.value,
        role: 'user',
      };
  
      this.authService.signUp(signUpData).subscribe({
        next: (res) => {
          console.log(res);
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Signup successful',
            showConfirmButton: false,
            timer: 1000,
          });
  
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Signup failed',
            text: 'Please try again later.',
          });
        },
      });
    }
    formData.resetForm();
  }
}  