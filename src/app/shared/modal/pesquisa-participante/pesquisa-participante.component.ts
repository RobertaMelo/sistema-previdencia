import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ParticipanteService } from '../../../services/participante.service';

@Component({
  selector: 'app-pesquisa-participante',
  templateUrl: './pesquisa-participante.component.html',
  styleUrls: ['./pesquisa-participante.component.css']
})
export class PesquisaParticipanteComponent implements OnInit {

  participantes: ParticipanteDTO[];
  @Output() respostaSelecao = new EventEmitter();

  constructor(
    public participanteService:  ParticipanteService
  ) { }

  ngOnInit() {
    this.carregaParticipantes();
  }

  
  carregaParticipantes() {
    this.participanteService.buscaTodos()
    .subscribe(response => {
      this.participantes = response;
    }, error => {
      console.log(error);
    });
  }

  selecionaParticipanteTabela(participante: ParticipanteDTO){
    this.respostaSelecao.emit(participante);
  }
  

}
