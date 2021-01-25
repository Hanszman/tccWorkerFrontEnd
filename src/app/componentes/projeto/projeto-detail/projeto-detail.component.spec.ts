import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoDetailComponent } from './projeto-detail.component';

describe('ProjetoDetailComponent', () => {
  let component: ProjetoDetailComponent;
  let fixture: ComponentFixture<ProjetoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
