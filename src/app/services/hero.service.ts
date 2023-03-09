import { Injectable } from '@angular/core';
import { IHeroInterface } from '../interfaces/HeroInterface';
import { HEROES } from '../mock/mock_heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** GET heroes from the server */
  getHeroes(): Observable<IHeroInterface[]> {
    return this.http.get<IHeroInterface[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<IHeroInterface[]>('getHeroes', []))
    );
  }
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<IHeroInterface> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHeroInterface>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHeroInterface>(`getHero id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the hero on the server */
  updateHero(hero: IHeroInterface): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: IHeroInterface): Observable<IHeroInterface> {
    return this.http
      .post<IHeroInterface>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: IHeroInterface) =>
          this.log(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<IHeroInterface>('addHero'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<IHeroInterface> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<IHeroInterface>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHeroInterface>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<IHeroInterface[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<IHeroInterface[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<IHeroInterface[]>('searchHeroes', []))
      );
  }
}
