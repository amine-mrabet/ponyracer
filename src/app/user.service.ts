import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  userEvents = new BehaviorSubject<UserModel | null>(null);
  constructor() {
    this.retrieveUser();
  }
  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', body);
  }

  authenticate(login: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', { login, password })
      .pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
  }
  private storeLoggedInUser(user: UserModel): void {
    localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }
  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value) as UserModel;
      this.userEvents.next(user);
    }
  }
  logout(): void {
    localStorage.removeItem('rememberMe');
    this.userEvents.next(null);
  }
}
