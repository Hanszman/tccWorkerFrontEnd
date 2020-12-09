import { TestBed } from '@angular/core/testing';

import { ValidaCamposService } from './valida-campos.service';

describe('ValidaCamposService', () => {
  let service: ValidaCamposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidaCamposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
