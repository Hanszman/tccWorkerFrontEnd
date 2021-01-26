import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroDetailComponent } from './quadro-detail.component';

describe('QuadroDetailComponent', () => {
  let component: QuadroDetailComponent;
  let fixture: ComponentFixture<QuadroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
