import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlePontoReadComponent } from './controle-ponto-read.component';

describe('ControlePontoReadComponent', () => {
  let component: ControlePontoReadComponent;
  let fixture: ComponentFixture<ControlePontoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlePontoReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlePontoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
