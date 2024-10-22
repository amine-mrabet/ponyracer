import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../from-now.pipe';
import { bufferToggle, catchError, EMPTY, filter, groupBy, interval, map, mergeMap, Subject, switchMap, tap, throttleTime } from 'rxjs';

@Component({
  selector: 'pr-live',
  standalone: true,
  imports: [PonyComponent, FromNowPipe],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  error = false;
  winners: Array<PonyWithPositionModel> = [];
  betWon: boolean | null = null;
  clickSubject = new Subject<PonyWithPositionModel>();
  route = inject(ActivatedRoute);
  raceService = inject(RaceService);

  constructor() {
    const raceId = parseInt(this.route.snapshot.paramMap.get('raceId')!);
    this.raceService
      .get(raceId)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => race.status !== 'FINISHED'),
        switchMap(race => this.raceService.live(race.id)),
        takeUntilDestroyed()
      )
      .subscribe({
        next: positions => {
          this.poniesWithPosition = positions;
          this.raceModel!.status = 'RUNNING';
        },
        error: () => (this.error = true),
        complete: () => {
          this.raceModel!.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel!.betPonyId);
        }
      });
    this.clickSubject
      .pipe(
        groupBy(pony => pony.id, { element: pony => pony.id }),
        mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))),
        filter(array => array.length >= 5),
        throttleTime(1000),
        map(array => array[0]),
        switchMap(ponyId => this.raceService.boost(this.raceModel!.id, ponyId).pipe(catchError(() => EMPTY)))
      )
      .subscribe(() => {});
  }
  onClick(pony: PonyWithPositionModel): void {
    this.clickSubject.next(pony);
  }
}
