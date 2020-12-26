import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorReadComponent } from './setor-read.component';

describe('SetorReadComponent', () => {
  let component: SetorReadComponent;
  let fixture: ComponentFixture<SetorReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
