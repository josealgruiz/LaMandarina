import { TestBed, async, inject } from '@angular/core/testing';

import { AuthLoginGuard } from './authlogin.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoginGuard]
    });
  });

  it('should ...', inject([AuthLoginGuard], (guard: AuthLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
