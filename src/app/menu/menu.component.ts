import { DecimalPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-menu',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  userService = inject(UserService);
  router = inject(Router);

  navbarCollapsed: boolean = true;
  user: Signal<UserModel | null>;
  constructor() {
    this.user = this.userService.currentUser;
  }
  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
