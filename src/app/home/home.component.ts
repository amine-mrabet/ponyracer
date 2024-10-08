import { UserService } from './../user.service';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  UserService = inject(UserService);
  user: UserModel | null = null;
  constructor() {
    this.UserService.userEvents.pipe(takeUntilDestroyed()).subscribe(user => (this.user = user));
  }
}
