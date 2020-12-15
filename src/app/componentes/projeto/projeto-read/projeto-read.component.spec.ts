import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoReadComponent } from './projeto-read.component';

describe('ProjetoReadComponent', () => {
  let component: ProjetoReadComponent;
  let fixture: ComponentFixture<ProjetoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
