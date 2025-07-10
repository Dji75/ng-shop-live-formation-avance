// export type LoadingState = 'Loading' | 'Success' | 'Error';

export const loadingState = {
  Loading: 'Loading',
  Success: 'Success',
  Error: 'Error',
} as const;

export type LoadingState = keyof typeof loadingState;

export interface UsersState {
  users: string[];
  loadingState: null | LoadingState;
}

export const initialState: UsersState = {
  users: [],
  loadingState: null,
}
