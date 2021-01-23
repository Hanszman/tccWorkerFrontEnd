import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaDetailComponent } from './etapa-detail.component';

describe('EtapaDetailComponent', () => {
  let component: EtapaDetailComponent;
  let fixture: ComponentFixture<EtapaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
