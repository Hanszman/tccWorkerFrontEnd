import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintReadComponent } from './sprint-read.component';

describe('SprintReadComponent', () => {
  let component: SprintReadComponent;
  let fixture: ComponentFixture<SprintReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
