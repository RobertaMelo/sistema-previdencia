import { Component, OnInit, Input } from '@angular/core';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ResgateDTO, SaldoDTO } from '../../../model/saldo.dto';
import { ResgateService } from '../../../services/resgate.service';

@Component({
  selector: 'app-resgate',
  templateUrl: './resgate.component.html',
  styleUrls: ['./resgate.component.css']
})
export class ResgateComponent implements OnInit {

  @Input() participante: ParticipanteDTO;
  @Input() saldo: SaldoDTO;

  resgate: ResgateDTO = {
    id: 0,
    tipoResgate: "",
    tipoSaldoResgate: "",
    dataUltimoResgate: null,
    valorParcelaResgate: null,
    idParticipanteFk: 0,
    opcaoPagamentoParcelado: "",
    quantidadeParcelaResgate: null,
    dataLiberacaoResgate: null,
    formulario: null,
    valorResgateParcial: null
  };

  formularioUpload: File = null;
  
  constructor(private resgateService: ResgateService) { }

  ngOnInit() {
    this.limpaFormulario();
  }

  calculaValorParcela(saldo : number) {
    if (this.resgate.quantidadeParcelaResgate > 0) {
      this.resgate.valorParcelaResgate = Math.round(saldo / this.resgate.quantidadeParcelaResgate)
    } 
    console.log("Você deve escolher uma quantidade de parcelas para continuar.")
    return;
  }

  calculaData(dias) {
    var data = new Date();
    data.setDate(data.getDate() + dias);  
  }

  uploadFormulario(arquivos: FileList) {
    if (this.resgate.formulario == null) {
      console.log("Para realizar o resgate com pagamento parcelado é necessário encaminhar o formulário preenchido");
      return;
    }
    this.formularioUpload = arquivos.item(0);
    this.resgate.formulario = new Blob([this.formularioUpload],{type: 'application/pdf'});
  }

  resgatePortabilidade() {
    this.saldo.saldoDisponivelRetirada = this.participante.saldoPortabilidade;
    if (this.participante.planoPortabilidade == "0" || "1") {
      if (this.resgate.tipoResgate == "0") {
        this.saldo.saldoDisponivelRetirada = this.resgate.valorResgateParcial;
      }
      if(this.resgate.opcaoPagamentoParcelado == "0") {
        this.calculaValorParcela(this.saldo.saldoDisponivelRetirada);
      }
      this.resgate.dataUltimoResgate = new Date();
      this.participante.saldoPortabilidade = 0;
      this.saldo.saldoTotal = this.saldo.saldoTotal - this.participante.saldoPortabilidade;
    }
    console.log("O resgate não se enquadra nesse tipo de plano oriundo de portabilidade");
    return;
  }

  resgateContribuicaoNormal() {
    if (this.resgate.tipoResgate == "1") {
      //mensagem confirmação
      this.resgateTotal(); 
      return;  
    } 
    if (this.resgate.tipoResgate == "0") {
      this.saldo.saldoDisponivelRetirada = this.resgate.valorResgateParcial;
    }
    //calcular ultima data que houve resgate para continuar, tem que ser no periodo de 2 anos.
    this.saldo.saldoDisponivelRetirada = Math.round(this.saldo.saldoContribuicoesNormais * (20/100))
    if(this.resgate.opcaoPagamentoParcelado == "0") {
      this.calculaValorParcela(this.saldo.saldoDisponivelRetirada);
    }
    this.resgate.dataUltimoResgate = new Date();
    this.saldo.saldoContribuicoesNormais = 0;
    this.saldo.saldoTotal = this.saldo.saldoTotal - this.saldo.saldoContribuicoesNormais;
  }

  resgateContribuicaoAdicional() {
    this.saldo.saldoDisponivelRetirada = this.saldo.saldoContribuicoesAdicionais;
    if (this.resgate.tipoResgate == "0") {
      this.saldo.saldoDisponivelRetirada = this.resgate.valorResgateParcial;
      this.saldo.saldoTotal = (this.saldo.saldoTotal - this.saldo.saldoDisponivelRetirada);
      this.saldo.saldoContribuicoesAdicionais = (this.saldo.saldoContribuicoesAdicionais - this.saldo.saldoDisponivelRetirada);
      this.resgate.dataUltimoResgate = new Date();
    }
    if(this.resgate.opcaoPagamentoParcelado == "0") {
      this.calculaValorParcela(this.saldo.saldoDisponivelRetirada);
    }
    if (this.resgate.tipoResgate == "1") {
      this.saldo.saldoTotal = this.saldo.saldoTotal - this.saldo.saldoContribuicoesAdicionais;
      this.saldo.saldoContribuicoesAdicionais = 0;
      this.resgate.dataUltimoResgate = new Date();
      console.log("O valor foi resgatado com sucesso.")
      } else {
        console.log("O resgate não se enquadra nesse tipo de plano oriundo de portabilidade");
    }

  }
  
  resgateTotal() {
    this.saldo.saldoDisponivelRetirada = this.saldo.saldoTotal;
    this.saldo.saldoTotal = 0;
    this.saldo.saldoContribuicoesAdicionais = 0;
    this.saldo.saldoContribuicoesNormais = 0;
    this.participante.saldoPortabilidade = 0;
    this.participante.situacaoParticipante == "1";
    this.resgate.dataUltimoResgate = new Date();
    console.log("O valor foi resgatado com sucesso. Seu plano foi cancelado.")
  }


  realizarResgate() {
    if (this.resgate.tipoResgate == "" || this.resgate.tipoSaldoResgate == "") {
      console.log("Os valores estão vazios");
      return; 
    }
    if (this.participante.situacaoParticipante == "1" || "2") {
      console.log("O resgate não pode ser realizado por um participante com situação atual de Cancelado ou Benefício");
      return; 
    }
    if (this.participante.carencia < new Date()) {
      console.log("O prazo de carência ainda não foi cumprido. O resgate poderá ser solicitado a partir de " + this.participante.carencia);
      return; 
    }
    switch (this.resgate.tipoResgate == "0" || this.resgate.tipoResgate == "1") {
      case this.resgate.tipoSaldoResgate == "0":
        this.resgatePortabilidade()
        break;
      case this.resgate.tipoSaldoResgate == "1":
        this.resgateContribuicaoNormal();
        break;
      case this.resgate.tipoSaldoResgate == "2":
        this.resgateContribuicaoAdicional();
        break;
      case this.resgate.tipoSaldoResgate == "2":
        this.resgateTotal();
        break;
    }
    this.resgate.idParticipanteFk = this.participante.id;
    this.resgateService.salva(this.resgate)
    .subscribe(() => {
      console.log('Salvo com sucesso!');
      console.log('Os valores pertinentes ao resgate serão liberados a partir de:' + this.calculaData(30));
      this.resgate.dataUltimoResgate = new Date();
      this.limpaFormulario();
    }, error => {
      console.log(error);
    });
  }


  limpaFormulario() {
    this.resgate.tipoResgate = "2";
    this.resgate.tipoSaldoResgate = "4";
    this.resgate.opcaoPagamentoParcelado = "2";
    this.resgate.valorParcelaResgate = 0;
    this.saldo.saldoDisponivelRetirada = this.saldo.saldoContribuicoesNormais;
    this.saldo.saldoTotal = this.saldo.saldoContribuicoesAdicionais + this.saldo.saldoContribuicoesNormais + this.participante.saldoPortabilidade;
  }

}
