import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { usersFeature } from './store/users.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    AsyncPipe
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
    private readonly store = inject(Store);

    protected readonly users$ = this.store.select(usersFeature.selectUsers);
    protected readonly loadingState$ = this.store.select(usersFeature.selectLoadingState);

    ngOnInit(): void {
      this.store.dispatch(UsersActions.loadUsers());
    }
}
