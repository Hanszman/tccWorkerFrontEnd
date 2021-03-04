import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioReadComponent } from './calendario-read.component';

describe('CalendarioReadComponent', () => {
  let component: CalendarioReadComponent;
  let fixture: ComponentFixture<CalendarioReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
