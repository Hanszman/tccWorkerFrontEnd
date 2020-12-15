import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeReadComponent } from './atividade-read.component';

describe('AtividadeReadComponent', () => {
  let component: AtividadeReadComponent;
  let fixture: ComponentFixture<AtividadeReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
