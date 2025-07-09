import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { catchError, share, Subject, switchMap, throwError } from 'rxjs';
import { isLogged } from './components/dashboard/shared/guards/users-guard/users-guard';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  myValues$= new Subject<number>();

  alwaysAliveObservable$ = this.myValues$.pipe(
    switchMap(
      (v) => throwError(() => new Error('test')).pipe(
      catchError(() => {
        console.log('alwaysAliveObservable$: catched after throw');
        return [0];
      }),
    )),
    catchError(() => {
      console.log('alwaysAliveObservable$: catched before share');
      return [0];
    }),
    share());

  deadableObservable$ = this.myValues$.pipe(
    switchMap((v) => throwError(() => new Error('test'))),
    catchError(() => {
      console.log('deadObservable$: catched before share');
      return [0];
    }),
    share());

  constructor() {
    this.alwaysAliveObservable$.subscribe({
      next:(v) => {
        console.log('alwaysAliveObservable$ next:', v)
      },
      error: (err) => {
        console.log('alwaysAliveObservable$: flux en erreur');
      },
      complete: () => {
        console.log('alwaysAliveObservable$ : flux complete');
      }
    });

    this.deadableObservable$.subscribe({
      next: (s) => {
        console.log('deadObservable$ next:', s);
      },
      error: (err) => {
        console.log('deadObservable$: flux en erreur');
      },
      complete: () => {
        console.log('deadObservable$ : flux complete');
      }
    });
  }

  onClick() {
    this.myValues$.next(5);
  }

  login() {
    isLogged.next(true);
  }

  logout() {
    isLogged.next(false);
  }
}
