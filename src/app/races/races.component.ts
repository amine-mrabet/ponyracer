import { Component, inject, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceComponent } from '../race/race.component';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [RaceComponent],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css'
})
export class RacesComponent implements OnInit {
  races!: RaceModel[];
  service = inject(RaceService);
  ngOnInit(): void {
    this.races = this.service.list();
  }
}
