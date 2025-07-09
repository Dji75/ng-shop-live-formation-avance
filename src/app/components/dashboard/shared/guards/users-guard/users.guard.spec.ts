import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { usersGuardCanActivate } from './users-guard';

describe('usersGuardGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => usersGuardCanActivate(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
