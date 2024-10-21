import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { LiveRaceModel, RaceModel } from './models/race.model';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor() {}
  http = inject(HttpClient);
  wsService = inject(WsService);
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
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(map(liveRace => liveRace.ponies));
  }
}
