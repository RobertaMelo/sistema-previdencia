import { Component, OnInit, Input } from '@angular/core';
import { ContribuicoesService } from '../../../services/contribuicoes.service';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ContribuicoesDTO, SaldoDTO } from '../../../model/saldo.dto';
import { SaldoService } from '../../../services/saldo.service';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-contribuicao-adicional',
  templateUrl: './contribuicao-adicional.component.html',
  styleUrls: ['./contribuicao-adicional.component.css']
})
export class ContribuicaoAdicionalComponent implements OnInit {

  contribuicoes: ContribuicoesDTO[];
  @Input() participante: ParticipanteDTO;
  @Input() saldo: SaldoDTO;
  contribuicao: ContribuicoesDTO = {
    id: 0,
    data: "",
    tipo: "",
    valor: null,
    idParticipanteFk: 0,
    idSaldoFK: 0    
  };
  

  constructor(
    private contribuicoesService: ContribuicoesService,
    private saldoService: SaldoService,
    private dateService: DateService
    ) { }

  ngOnInit() {
  }

  carregaContribuicoes() {
    this.contribuicoesService.buscaTodos()
    .subscribe(response => {
      this.contribuicoes = response.filter(contribuicao => contribuicao.idParticipanteFk == this.participante.id);
    }, error => {
      console.log(error);
    });
  }

  realizarContribuicao() {
    if (this.contribuicao.valor == null || this.contribuicao.tipo == "") {
      console.log("Os valores estão vazios");
      return; 
    }
    if (this.contribuicao.tipo == "0") {
      this.saldo.saldoContribuicoesNormais += this.contribuicao.valor;
    } else {
      this.saldo.saldoContribuicoesAdicionais += this.contribuicao.valor;
    }
    this.contribuicao.idParticipanteFk = this.participante.id;
    this.contribuicao.idSaldoFK = this.participante.idSaldoFK;
    this.contribuicao.data = (this.dateService.formataData(new Date()));
    this.saldo.saldoDisponivelRetirada += this.contribuicao.valor;
    this.saldo.saldoTotal += this.contribuicao.valor;

    this.contribuicoesService.salva(this.contribuicao)
    .subscribe(response => {
      this.saldoService.altera(this.saldo)
      .subscribe(response => {
        console.log('Salvo com sucesso! ' + response);
      }, error => {
        console.log(error);
      });
      this.carregaContribuicoes();
    }, error => {
      console.log(error);
    });
    
  }

}
