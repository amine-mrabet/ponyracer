import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  private user = signal<UserModel | null>(null);
  readonly currentUser = this.user.asReadonly();
  constructor() {
    this.retrieveUser();
    effect(() => {
      // every time the user signal changes, we store it in local storage
      if (this.user()) {
        window.localStorage.setItem('rememberMe', JSON.stringify(this.user()));
      } else {
        window.localStorage.removeItem('rememberMe');
      }
    });
  }
  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, body);
  }

  authenticate(login: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.baseUrl}/api/users/authentication`, { login, password })
      .pipe(tap((user: UserModel) => this.user.set(user)));
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value) as UserModel;
      this.user.set(user);
    }
  }
  logout(): void {
    this.user.set(null);
  }
}
