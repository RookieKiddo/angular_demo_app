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
    private heroService: HeroService // private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as IHeroInterface).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: IHeroInterface): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  // selectedHero?: IHeroInterface;
  // onSelect(hero: IHeroInterface): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }
}
