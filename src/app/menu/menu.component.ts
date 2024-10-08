import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { DecimalPipe } from '@angular/common';
import { UserModel } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  user: UserModel | null = null;
  constructor() {
    this.userService.userEvents.pipe(takeUntilDestroyed()).subscribe(user => (this.user = user));
  }
  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
