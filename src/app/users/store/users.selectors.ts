import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.state';
import { usersFeature } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(
  usersFeature.name
);
