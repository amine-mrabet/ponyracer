import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from './../user.service';

@Component({
  selector: 'pr-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userService = inject(UserService);
  user: Signal<UserModel | null>;
  constructor() {
    this.user = this.userService.currentUser;
  }
}
