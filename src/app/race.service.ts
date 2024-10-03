import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor() {}
  list(): Array<RaceModel> {
    return [
      {
        id: 12,
        name: 'Paris',
        ponies: [
          { id: 1, name: 'Gentle Pie', color: 'YELLOW' },
          { id: 2, name: 'Big Soda', color: 'ORANGE' },
          { id: 3, name: 'Gentle Bottle', color: 'PURPLE' },
          { id: 4, name: 'Superb Whiskey', color: 'GREEN' },
          { id: 5, name: 'Fast Rainbow', color: 'BLUE' }
        ],
        startInstant: '2024-09-18T08:02:00Z'
      },
      {
        id: 13,
        name: 'Tokyo',
        ponies: [
          { id: 6, name: 'Fast Rainbow', color: 'BLUE' },
          { id: 7, name: 'Gentle Castle', color: 'GREEN' },
          { id: 8, name: 'Awesome Rock', color: 'PURPLE' },
          { id: 9, name: 'Little Rainbow', color: 'YELLOW' },
          { id: 10, name: 'Great Soda', color: 'ORANGE' }
        ],
        startInstant: '2024-10-01T08:03:00Z'
      }
    ];
  }
}
