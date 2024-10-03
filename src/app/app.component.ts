import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';

@Component({
  selector: 'pr-root',
  standalone: true,
  imports: [MenuComponent, RacesComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
