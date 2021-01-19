import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorDetailComponent } from './setor-detail.component';

describe('SetorDetailComponent', () => {
  let component: SetorDetailComponent;
  let fixture: ComponentFixture<SetorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
