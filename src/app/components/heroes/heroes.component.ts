import { Component } from '@angular/core';
import { IHeroInterface } from 'src/app/interfaces/HeroInterface';
import { HEROES } from 'src/app/mock/mock_heroes';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: IHeroInterface[] = [];

  constructor(
    private heroService: HeroService
  ) // private messageService: MessageService
  {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  // selectedHero?: IHeroInterface;
  // onSelect(hero: IHeroInterface): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }
}
