import { Component, OnInit } from '@angular/core';
import { ContribuicoesService } from '../services/contribuicoes.service';
import { ContribuicoesDTO, SaldoDTO } from '../model/saldo.dto';
import { SaldoService } from '../services/saldo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipanteDTO, EmpresaDTO } from '../model/participante.dto';
import { ParticipanteService } from '../services/participante.service';
import { EmpresaService } from '../services/empresa.service';


@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css']
})
export class SaldosComponent implements OnInit {

  participante: ParticipanteDTO;
  contribuicoes: ContribuicoesDTO[];
  saldos: SaldoDTO[];
  saldo: SaldoDTO;
  empresa: EmpresaDTO;
  descricaoSituacao: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public participantesService: ParticipanteService,
    public contribuicoesService: ContribuicoesService,
    public saldosService: SaldoService,
    public empresaService: EmpresaService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(participante => {
      this.carregaDados(participante.participanteId);
    });
  }

  carregaDados(participanteId) {
    this.participantesService.buscaPorId(participanteId)
    .subscribe(response => {
      this.participante = response;
      this.carregaContribuicoes();
      this.carregaSaldo(this.participante.idSaldoFK);
      this.carregaEmpresa();
      this.descricaoSituacao = this.participantesService.buscaDescricaoSituacao(this.participante);
    }, error => {
      console.log(error);
      this.router.navigate(["home"]);
    });
  }

  carregaContribuicoes() {
    this.contribuicoesService.buscaTodos()
    .subscribe(response => {
      this.contribuicoes = response.filter(contribuicao => contribuicao.idParticipanteFk == this.participante.id);
    }, error => {
      console.log(error);
    });
  }

  carregaSaldo(idSaldo: number) {
    this.saldosService.buscaPorId(idSaldo)
    .subscribe(response => {
      this.saldo = response;
      this.saldo.saldoTotal = this.saldo.saldoContribuicoesAdicionais + this.saldo.saldoContribuicoesNormais + this.participante.saldoPortabilidade;
    }, error => {
      console.log(error);
    });
  }

  carregaEmpresa() {
    this.empresaService.buscaPorId(this.participante.idEmpresaFK)
    .subscribe(response => {
      this.empresa = response;
    }, error => {
      console.log(error);
    });
  } 

  buscaDescricaoTipoContribuicao(contribuicao: ContribuicoesDTO) {
    return this.contribuicoesService.buscaDescricaoTipoContribuicao(contribuicao);
  }

}
