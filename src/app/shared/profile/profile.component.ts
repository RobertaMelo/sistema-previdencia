import { Component, OnInit, Input } from '@angular/core';
import { ParticipanteDTO, EmpresaDTO } from '../../model/participante.dto';
import { SaldoDTO, ContribuicoesDTO } from '../../model/saldo.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() participante: ParticipanteDTO;
  @Input() empresa: EmpresaDTO;
  @Input() saldo: SaldoDTO;
  @Input() contribuicoes: ContribuicoesDTO[];
  @Input() descricaoSituacao: string;

  constructor() { }

  ngOnInit() {
  }
  
}
