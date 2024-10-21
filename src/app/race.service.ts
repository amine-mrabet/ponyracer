import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { interval, map, Observable, take } from 'rxjs';
import { environment } from '../environments/environment';
import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor() {}
  http = inject(HttpClient);
  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }
  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }
  cancelBet(raceId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }
  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return interval(1000).pipe(
      take(101),
      map(position => [
        {
          id: 1,
          name: 'Superb Runner',
          color: 'BLUE',
          position
        },
        {
          id: 2,
          name: 'Awesome Fridge',
          color: 'GREEN',
          position
        },
        {
          id: 3,
          name: 'Great Bottle',
          color: 'ORANGE',
          position
        },
        {
          id: 4,
          name: 'Little Flower',
          color: 'YELLOW',
          position
        },
        {
          id: 5,
          name: 'Nice Rock',
          color: 'PURPLE',
          position
        }
      ])
    );
  }
}
