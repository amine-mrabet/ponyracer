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
  authenticate(login: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', { login, password })
      .pipe(tap((user: UserModel) => this.userEvents.next(user)));
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', body);
  }
}
