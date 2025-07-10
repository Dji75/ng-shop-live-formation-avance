import { linkedSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import {
  interval,
  shareReplay,
  tap,
  take,
  of,
  map,
  filter,
  range,
  fromEvent,
  distinctUntilChanged,
  debounceTime,
  Observable,
  switchMap,
  merge,
  delay, combineLatest, zip
} from 'rxjs';
import { cold } from 'jasmine-marbles';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ngshop20');
  });

  it('should execute shared observable', () => {
    const shared$ = interval(1000).pipe(
      take(3),
      tap(x => console.log('Source:', x)),
      shareReplay(2),
    );

    // Les deux souscriptions partagent la même exécution
    shared$.subscribe(x => console.log('Obs 1:', x));
    shared$.subscribe( /// deprecated
      x => console.log('Obs 2:', x),
        err => console.log('Obs 2 error'),
      () => console.log('Obs 2 complete')
    );
    shared$.subscribe({ // new syntax
      next: x => console.log('Obs 3:', x),
      error: err => console.log('Obs 3 error'),
      complete: () => console.log('Obs 3 complete')
    });
    shared$.subscribe(x => console.log('Obs 4:', x));
  });


  it('should display result of observable > 20', () => {
    range(1, 5).pipe(
      map(x => x * 10),
      filter(x => x > 20),
      tap(x => console.log(x)),
    ).subscribe();
  });


  // Fonction simulant une API de recherche
  function searchAPI(term: string) {
    console.log(`Recherche pour: ${term}`);
    return new Observable(subscriber => {
      const timeout = setTimeout(() => {
        subscriber.next([`Résultat pour "${term}"`]);
        subscriber.complete();
      }, 1000);

      return () => clearTimeout(timeout);
    });
  }

  it('should not emit too many values', () => {
    // '-a-b-b-b-b-c-c-|'
    // const results$ = cold(' 1s (a|)', { a: 'text', b: 'texti', c: 'textile' });
    const results$ = merge(
      of('text'),
      of('textile').pipe(delay(400)),
      of('texti').pipe(delay(600)),
    );

    // expect(results$.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap((term) => searchAPI(term))
    // )).toBeObservable(cold(' 1s (a|)', { a: 'text' }));

    results$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => searchAPI(term))
    ).subscribe(v => console.log('resultat: ', v));
  });


  it('should combine obs', () => {
    const firsts$ = of(1, 2, 3);
    const seconds$ = of(11, 222, 333).pipe(delay(500));

    // combineLatest({
    //   first: firsts$,
    //   second: seconds$
    // }).subscribe(({first, second })=> {
    //   console.log('first: ', first);
    //   console.log('second: ', second);
    // });


    zip(firsts$, seconds$).subscribe(([first, second])=> {
      console.log('first: ', first);
      console.log('second: ', second);
    })
  });

  fit('should test signals', () => {
    // Création d'un signal
    const compteur = signal(0);

    // Méthode set: remplace la valeur actuelle
    compteur.set(5);

    // Méthode update: mise à jour basée sur la valeur actuelle
    compteur.update(valeur => valeur + 1);



    const optionsLivraison = signal(['Standard', 'Express', 'International']);
    const optionSelectionnee = linkedSignal(() => optionsLivraison()[0]);

    console.log(optionSelectionnee()); // 'Standard'

    // On peut modifier la valeur du linkedSignal
    optionSelectionnee.set(optionsLivraison()[1]);
    console.log(optionSelectionnee()); // 'Express'

    // Si la source change, linkedSignal est mis à jour automatiquement
    optionsLivraison.set(['Email', 'Retrait en magasin', 'Livraison à domicile']);
    console.log(optionSelectionnee()); // 'Email' (reset à la première option)



    const optionSelectionneeWithComputation = linkedSignal<string[], string>({
      source: optionsLivraison,
      computation: (nouvelleListe, prev) => {
        // Si pas de valeur précédente, retourne la première option
        if (!prev) return nouvelleListe[0];

        // Si l'option précédemment sélectionnée existe encore, la conserver
        if (nouvelleListe.includes(prev.value)) return prev.value;

        // Sinon, revenir à la première option
        return nouvelleListe[0];
      }
    });
  });

  it('should not do anti pattern nested signals', () => {
    const test = {
      prop1: signal(5),
      prop2: signal('test'),
    }

    console.log('valeur de signal', test.prop1());
  });
});
