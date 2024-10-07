import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}
  http = inject(HttpClient);

  authenticate(login: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', { login, password });
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', body);
  }
}
