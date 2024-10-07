import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  credentials = inject(NonNullableFormBuilder).group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  authenticationFailed = false;
  authenticate(): void {
    this.authenticationFailed = false;
    const { login, password } = this.credentials.value;
    this.userService.authenticate(login!, password!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.authenticationFailed = true)
    });
  }
}
