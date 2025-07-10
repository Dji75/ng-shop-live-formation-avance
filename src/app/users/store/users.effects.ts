import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { delay, of } from 'rxjs';
import { UsersActions } from './users.actions';


@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      concatMap(() => of(['toto', 'titi', 'tata']).pipe(
        delay(3000),
        map(users => UsersActions.loadUsersSuccess({ users })),
        catchError(error => of(UsersActions.loadUsersFailure({ error }))))
      )
    );
  });
}
