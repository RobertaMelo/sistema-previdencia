import { Component, OnInit, Input } from '@angular/core';
import { ContribuicoesService } from '../../../services/contribuicoes.service';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ContribuicoesDTO, SaldoDTO } from '../../../model/saldo.dto';
import { SaldoService } from '../../../services/saldo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contribuicao-adicional',
  templateUrl: './contribuicao-adicional.component.html',
  styleUrls: ['./contribuicao-adicional.component.css']
})
export class ContribuicaoAdicionalComponent implements OnInit {


  @Input() participante: ParticipanteDTO;
  @Input() saldo: SaldoDTO;
  @Input() contribuicoes: ContribuicoesDTO[];

  contribuicao: ContribuicoesDTO = {
    id: 0,
    data: null,
    tipo: "",
    valor: null,
    idParticipanteFk: 0,
    idSaldoFK: 0    
  };
  

  constructor(
    private contribuicoesService: ContribuicoesService,
    private saldoService: SaldoService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  realizarContribuicao() {
    if (this.contribuicao.valor == null || this.contribuicao.tipo == "") {
      this.toastr.info("Informe os dados.");
      return; 
    }
    if (this.contribuicao.tipo == "0") {
      this.saldo.saldoContribuicoesNormais += this.contribuicao.valor;
    } else {
      this.saldo.saldoContribuicoesAdicionais += this.contribuicao.valor;
    }
    this.contribuicao.idParticipanteFk = this.participante.id;
    this.contribuicao.idSaldoFK = this.participante.idSaldoFK;
    this.contribuicao.data = new Date();
    this.saldo.saldoTotal += this.contribuicao.valor;

    this.contribuicoesService.salva(this.contribuicao)
    .subscribe(response => {
      this.contribuicoes.push(response);
      console.log(this.saldo)
      this.saldoService.altera(this.saldo)
      .subscribe(response => {
        console.log('Salvo com sucesso! ' + response);
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
    
  }
}
