import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PonyComponent } from '../pony/pony.component';

@Component({
  selector: 'pr-live',
  standalone: true,
  imports: [PonyComponent],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  route = inject(ActivatedRoute);
  raceService = inject(RaceService);

  constructor() {
    const raceId = parseInt(this.route.snapshot.paramMap.get('raceId')!);
    this.raceService.get(raceId).subscribe(race => (this.raceModel = race));
    this.raceService
      .live(raceId)
      .pipe(takeUntilDestroyed())
      .subscribe(positions => (this.poniesWithPosition = positions));
  }
}
