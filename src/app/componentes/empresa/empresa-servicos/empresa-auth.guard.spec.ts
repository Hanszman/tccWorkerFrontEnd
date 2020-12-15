import { TestBed } from '@angular/core/testing';

import { EmpresaAuthGuard } from './empresa-auth.guard';

describe('EmpresaAuthGuard', () => {
  let guard: EmpresaAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpresaAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
