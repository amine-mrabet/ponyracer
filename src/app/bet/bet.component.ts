import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, Subject, switchMap } from 'rxjs';
import { PonyComponent } from '../pony/pony.component';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyModel } from '../models/pony.model';
import { FromNowPipe } from '../from-now.pipe';

@Component({
  standalone: true,
  imports: [PonyComponent, FromNowPipe],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.css'
})
export class BetComponent {
  raceModel: RaceModel | null = null;
  betFailed = false;
  private refreshSubject = new Subject<void>();
  raceService = inject(RaceService);
  route = inject(ActivatedRoute);
  constructor() {
    const raceId = parseInt(this.route.snapshot.paramMap.get('raceId')!);
    this.refreshSubject
      .pipe(
        startWith(undefined),
        switchMap(() => this.raceService.get(raceId)),
        takeUntilDestroyed()
      )
      .subscribe(race => (this.raceModel = race));
  }

  betOnPony(pony: PonyModel): void {
    this.betFailed = false;
    this.raceService.bet(this.raceModel!.id, pony.id).subscribe({
      next: () => this.refreshSubject.next(),
      error: () => (this.betFailed = true)
    });
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel!.betPonyId;
  }
}
