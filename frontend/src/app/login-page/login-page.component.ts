import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isRegister: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.checkRegister();
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
    });
  }

  checkRegister() {
    this.isRegister = this.router.url.substring(1) === 'register';
  }

  togglePage() {
    this.isRegister
      ? this.router.navigate(['/login'])
      : this.router.navigate(['/register']);
  }

  onSubmit(isRegister: boolean) {
    isRegister ? this.onRegister() : this.onLogin();
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = (({ confirmPassword, ...o }) => o)(
        this.loginForm.value
      );
      this.usersService.loginUser(loginData).subscribe({
        next: (res) => {
          localStorage.setItem('userLogin', res.login);
          localStorage.setItem('userId', res._id);
          localStorage.setItem('isAdmin', res.isAdmin.toString());
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }

  onRegister() {
    if (this.loginForm.valid) {
      if (
        this.loginForm.value.password !== this.loginForm.value.confirmPassword
      ) {
        alert('Passwords do not match');
        return;
      }

      const registerData = (({ confirmPassword, ...o }) => o)(
        this.loginForm.value
      );

      this.usersService.registerUser(registerData).subscribe({
        next: (res) => {
          localStorage.setItem('userLogin', res.login);
          localStorage.setItem('userId', res._id);
          localStorage.setItem('isAdmin', res.isAdmin.toString());
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }
}
