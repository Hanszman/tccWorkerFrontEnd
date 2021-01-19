import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorFormComponent } from './setor-form.component';

describe('SetorFormComponent', () => {
  let component: SetorFormComponent;
  let fixture: ComponentFixture<SetorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
