import { Injectable } from '@angular/core';
import { IHeroInterface } from '../interfaces/HeroInterface';
import { HEROES } from '../mock/mock_heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<IHeroInterface[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
