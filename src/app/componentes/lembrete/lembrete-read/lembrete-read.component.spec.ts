import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembreteReadComponent } from './lembrete-read.component';

describe('LembreteReadComponent', () => {
  let component: LembreteReadComponent;
  let fixture: ComponentFixture<LembreteReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembreteReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembreteReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
