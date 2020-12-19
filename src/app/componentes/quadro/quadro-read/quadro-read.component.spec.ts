import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroReadComponent } from './quadro-read.component';

describe('QuadroReadComponent', () => {
  let component: QuadroReadComponent;
  let fixture: ComponentFixture<QuadroReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadroReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
