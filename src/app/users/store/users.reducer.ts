import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { initialState, loadingState } from './users.state';

const usersFeatureKey = 'users';

const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({
    ...state,
    loadingState: loadingState.Loading,
  })),
  on(UsersActions.loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    loadingState: loadingState.Success,
  })),
  on(UsersActions.loadUsersFailure, (state, action) => ({
    ...state,
    loadingState: loadingState.Error,
  })),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});

