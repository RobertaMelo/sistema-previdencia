import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ParticipanteService } from '../../../services/participante.service';

@Component({
  selector: 'app-pesquisa-participante',
  templateUrl: './pesquisa-participante.component.html',
  styleUrls: ['./pesquisa-participante.component.css']
})
export class PesquisaParticipanteComponent implements OnInit {

  @Output() respostaSelecao = new EventEmitter();
  @Input() participantes: ParticipanteDTO[];

  constructor(
    public participanteService: ParticipanteService
  ) { }

  ngOnInit() { }

  selecionaParticipanteTabela(participante: ParticipanteDTO){
    this.respostaSelecao.emit(participante);
  }

  buscaDescricaoParticipante(participante: ParticipanteDTO) {
    return this.participanteService.buscaDescricaoSituacao(participante);
  }

}
