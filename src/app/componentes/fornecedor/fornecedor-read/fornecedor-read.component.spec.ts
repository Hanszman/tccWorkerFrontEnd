import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorReadComponent } from './fornecedor-read.component';

describe('FornecedorReadComponent', () => {
  let component: FornecedorReadComponent;
  let fixture: ComponentFixture<FornecedorReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
