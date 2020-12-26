import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaReadComponent } from './etapa-read.component';

describe('EtapaReadComponent', () => {
  let component: EtapaReadComponent;
  let fixture: ComponentFixture<EtapaReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
