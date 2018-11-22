import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuicaoAdicionalComponent } from './contribuicao-adicional.component';

describe('ContribuicaoAdicionalComponent', () => {
  let component: ContribuicaoAdicionalComponent;
  let fixture: ComponentFixture<ContribuicaoAdicionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContribuicaoAdicionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuicaoAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
