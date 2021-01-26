import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroFormComponent } from './quadro-form.component';

describe('QuadroFormComponent', () => {
  let component: QuadroFormComponent;
  let fixture: ComponentFixture<QuadroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
