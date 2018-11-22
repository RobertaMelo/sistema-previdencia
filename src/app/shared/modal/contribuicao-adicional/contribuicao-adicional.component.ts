import { Component, OnInit, Input } from '@angular/core';
import { ContribuicoesService } from '../../../services/contribuicoes.service';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ContribuicoesDTO, SaldoDTO } from '../../../model/saldo.dto';

@Component({
  selector: 'app-contribuicao-adicional',
  templateUrl: './contribuicao-adicional.component.html',
  styleUrls: ['./contribuicao-adicional.component.css']
})
export class ContribuicaoAdicionalComponent implements OnInit {

  @Input() participante: ParticipanteDTO;
  @Input() saldo: SaldoDTO;
  contribuicao: ContribuicoesDTO = {
    id: 0,
    data: null,
    tipo: "",
    valor: null,
    idParticipanteFk: 0    
  };
  
  constructor(private contribuicoesService: ContribuicoesService) { }

  ngOnInit() {
  }

  realizarContribuicao() {
    if (this.contribuicao.valor == null || this.contribuicao.tipo == "") {
      console.log("Os valores estão vazios");
      return; 
    }
    this.contribuicao.idParticipanteFk = this.participante.id;
    this.contribuicao.data = new Date();
    this.saldo.saldoDisponivelRetirada = this.saldo.saldoDisponivelRetirada + this.contribuicao.valor;
    this.saldo.saldoTotal = this.saldo.saldoTotal + this.contribuicao.valor;
    this.contribuicoesService.salva(this.contribuicao)
    .subscribe(() => {
      console.log('Salvo com sucesso!');
    }, error => {
      console.log(error);
    });

  }

}
