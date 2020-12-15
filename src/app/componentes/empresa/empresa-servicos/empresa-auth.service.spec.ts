import { TestBed } from '@angular/core/testing';

import { EmpresaAuthService } from './empresa-auth.service';

describe('EmpresaAuthService', () => {
  let service: EmpresaAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
