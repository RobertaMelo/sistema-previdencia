import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaParticipanteComponent } from './pesquisa-participante.component';

describe('PesquisaParticipanteComponent', () => {
  let component: PesquisaParticipanteComponent;
  let fixture: ComponentFixture<PesquisaParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
