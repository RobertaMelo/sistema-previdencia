import { Component, OnInit, Input } from '@angular/core';
import { ParticipanteDTO } from '../../../model/participante.dto';
import { ResgateDTO, SaldoDTO } from '../../../model/saldo.dto';
import { ResgateService } from '../../../services/resgate.service';
import { ToastrService } from 'ngx-toastr';  
import { DateService } from '../../../services/date.service';
import { SaldoService } from '../../../services/saldo.service';
import { ParticipanteService } from '../../../services/participante.service';

@Component({
  selector: 'app-resgate',
  templateUrl: './resgate.component.html',
  styleUrls: ['./resgate.component.css'],
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
    quantidadeParcelaResgate: 1,
    dataLiberacaoResgate: null,
    formulario: null,
    valorResgateParcial: null
  };

  formularioUpload: File = null;
  
  constructor(
    private resgateService: ResgateService,
    private saldoService: SaldoService,
    private participanteService: ParticipanteService,
    private toastr: ToastrService,
    private dateService: DateService
    ) { }

  ngOnInit() {
    this.limpaFormulario();
  }

  calculaValorParcela(saldo : number) {
    if (this.resgate.quantidadeParcelaResgate > 0) {
      this.resgate.valorParcelaResgate = Math.round(saldo / this.resgate.quantidadeParcelaResgate)
    } 
    this.toastr.warning("Escolha a quantidade de parcelas para continuar.");
    return;
  }

  uploadFormulario(arquivos: FileList) {
    this.formularioUpload = arquivos.item(0);
    this.resgate.formulario = new Blob([this.formularioUpload],{type: 'application/pdf'});
  }

  atualizaSaldoDisponivelRetirada() {
    switch (this.resgate.tipoSaldoResgate) {
      case "0": // resgatePortabilidade
        this.saldo.saldoDisponivelRetirada = this.participante.saldoPortabilidade;
        break;
      case "1": // resgateContribuicaoNormal
        this.saldo.saldoDisponivelRetirada = Math.round(this.saldo.saldoContribuicoesNormais * (20/100)); // 20% ao ano
        break;
      case "2": // resgateContribuicaoAdicional
        this.saldo.saldoDisponivelRetirada = this.saldo.saldoContribuicoesAdicionais;
        break;
      case "3": // resgateTotal
        this.saldo.saldoDisponivelRetirada = this.saldo.saldoTotal;
        break;
    }
  }

  resgatePortabilidade() {
    if (this.participante.planoPortabilidade == "2") {
      this.toastr.error("O resgate não se enquadra nesse tipo de plano de portabilidade.");
      return;
    }

    if (this.resgate.tipoResgate == "0") { // resgate parcial portabilidade 
      
      if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado parcial portabilidade
        if (this.resgate.valorResgateParcial <= this.saldo.saldoDisponivelRetirada) {
          this.resgate.valorParcelaResgate = Math.round(this.resgate.valorResgateParcial / this.resgate.quantidadeParcelaResgate);
        } else {
          this.toastr.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
          return;
        }
      } else { // resgate não parcelado parcial portabilidade
        this.resgate.valorParcelaResgate = this.resgate.valorResgateParcial;
      }

      this.participante.saldoPortabilidade -= this.resgate.valorResgateParcial;
      this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
      this.saldo.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;
      
      return;
    }

    // resgate total portabilidade
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total portabilidade
      this.resgate.valorParcelaResgate = Math.round(this.saldo.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate);
    } else { // resgate não parcelado total portabilidade
      this.resgate.valorParcelaResgate = this.saldo.saldoDisponivelRetirada;
    }

    this.participante.saldoPortabilidade -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoTotal -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoDisponivelRetirada = 0;
  }

  resgateContribuicaoNormal() {
    this.saldo.saldoDisponivelRetirada = Math.round(this.saldo.saldoContribuicoesNormais * (20/100));
    if (this.resgate.dataUltimoResgate < this.dateService.adicionaAnos(this.resgate.dataUltimoResgate, 2)){
      this.toastr.error("O resgate não pode ser realizado dentro do período de 2 anos, após o ultimo resgate.");
    }

    if (this.resgate.tipoResgate == "0") { // resgate parcial contribuicao normal 
      
      if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado parcial contribuicao normal 
        if (this.resgate.valorResgateParcial <= this.saldo.saldoDisponivelRetirada) {
        this.resgate.valorParcelaResgate = Math.round(this.resgate.valorResgateParcial / this.resgate.quantidadeParcelaResgate);
        } else {
          this.toastr.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
          return;
        }
      } else { // resgate não parcelado parcial contribuicao normal 
        this.resgate.valorParcelaResgate = this.resgate.valorResgateParcial;
      }

      this.saldo.saldoContribuicoesNormais -= this.resgate.valorResgateParcial;
      this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
      this.saldo.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;
      
      return;
    }

    // resgate total contribuicao normal 
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total contribuicao normal 
      this.resgate.valorParcelaResgate = Math.round(this.saldo.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate);
    } else { // resgate não parcelado total portabilidade
      this.resgate.valorParcelaResgate = this.saldo.saldoDisponivelRetirada;
    }

    this.saldo.saldoContribuicoesNormais -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoTotal -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoDisponivelRetirada = 0;
  }

  resgateContribuicaoAdicional() {

    if (this.resgate.tipoResgate == "0") { // resgate parcial contribuição adicional
       
      if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado parcial contribuição adicional
        if (this.resgate.valorResgateParcial <= this.saldo.saldoDisponivelRetirada) {
          this.resgate.valorParcelaResgate = Math.round(this.resgate.valorResgateParcial / this.resgate.quantidadeParcelaResgate);
        } else {
          this.toastr.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
          return;
        }
      } else { // resgate não parcelado parcial contribuição adicional
        this.resgate.valorParcelaResgate = this.resgate.valorResgateParcial;
      }

      this.saldo.saldoContribuicoesAdicionais -= this.resgate.valorResgateParcial;
      this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
      this.saldo.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;
      
      return;
    }

    // resgate total contribuição adicional
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total contribuição adicional
      this.resgate.valorParcelaResgate = Math.round(this.saldo.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate);
    } else { // resgate não parcelado total contribuição adicional
      this.resgate.valorParcelaResgate = this.saldo.saldoDisponivelRetirada;
    }

    this.saldo.saldoContribuicoesAdicionais -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoTotal -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoDisponivelRetirada = 0;

  }
  
  resgateTotal() {

    // resgate total todos os saldos
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total todos os saldos
      if (this.resgate.valorResgateParcial == this.saldo.saldoDisponivelRetirada) {
        this.resgate.valorParcelaResgate = Math.round(this.saldo.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate);
      } else {
        this.toastr.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
        return;
      }
    } else { // resgate não parcelado total todos os saldos
      this.resgate.valorParcelaResgate = this.saldo.saldoDisponivelRetirada;
    }

    this.saldo.saldoContribuicoesAdicionais = 0;
    this.saldo.saldoContribuicoesNormais = 0;
    this.participante.saldoPortabilidade = 0;
    this.saldo.saldoTotal -= this.saldo.saldoDisponivelRetirada;
    this.saldo.saldoDisponivelRetirada = 0;
    this.participante.situacaoParticipante == "1";

    this.toastr.success("O valor foi resgatado com sucesso e seu plano foi cancelado.");
  }

  validaResgate() {
    if (this.resgate.tipoResgate == "" || this.resgate.tipoSaldoResgate == "") {
      this.toastr.warning("Você deve selecionar o tipo de resgate e o tipo de saldo de resgate.");
      //this.alerts.setMessage('Os valores do tipo de resgate e tipo de saldo do resgate estão vazios','error');
      return false; 
    }
   
    if (this.participante.situacaoParticipante == "1" || this.participante.situacaoParticipante == "2") {
      this.toastr.error("O resgate não pode ser realizado por um participante com situação atual de Cancelado ou Benefício.");
      return false; 
    }
    
    if (this.participante.carencia < new Date()) {
      this.toastr.info("O prazo de carência ainda não foi cumprido. O resgate poderá ser solicitado a partir de " + this.participante.carencia);
      return false; 
    }

    if (this.saldo.saldoDisponivelRetirada <= 0) {
      this.toastr.info("Você não possui saldo disponível para resgate.");
      return false;
    }

    if (this.resgate.tipoResgate == "0") {
      if (this.resgate.formulario == null) {
        this.toastr.error("Para realizar o resgate com pagamento parcelado é necessário encaminhar o formulário preenchido");
        return false;
      }

      if (this.resgate.valorResgateParcial > this.saldo.saldoDisponivelRetirada)  {
        this.toastr.warning("Valor parcial maior que valor disponivel para retirada.");
        return false;
      }
    }

    if(this.resgate.opcaoPagamentoParcelado == "0" && this.resgate.quantidadeParcelaResgate <= 0) {
      this.toastr.error("Quantidade de parcelas inválida para resgate.");
      return false;
    }

    return true;
  }

  realizarResgate() {
    if (!this.validaResgate()) {
      return;
    }

    switch (this.resgate.tipoSaldoResgate) {
      case "0":
        this.resgatePortabilidade();
        break;
      case "1":
        this.resgateContribuicaoNormal();
        break;
      case "2":
        this.resgateContribuicaoAdicional();
        break;
      case "3":
        this.resgateTotal();
        break;
    }

    this.resgate.idParticipanteFk = this.participante.id;
    this.resgate.dataUltimoResgate = new Date();

    this.resgateService.salva(this.resgate)
    .subscribe(() => {
      this.participanteService.altera(this.participante)
      .subscribe(response => {
        console.log('Alterado com sucesso! ' + response);
      }, error => {
        console.log(error);
      });
      this.saldoService.altera(this.saldo)
      .subscribe(response => {
        console.log('Alterado com sucesso! ' + response);
      }, error => {
        console.log(error);
      });
      this.toastr.info("Os valores pertinentes ao resgate serão liberados a partir de:" + this.dateService.adicionaDias(new Date(), 30));
      this.limpaFormulario();
    }, error => {
      console.log(error);
    });
  }

  limpaFormulario() {
    this.resgate.tipoResgate = "";
    this.resgate.tipoSaldoResgate = "";
    this.resgate.opcaoPagamentoParcelado = "2";
    this.resgate.valorParcelaResgate = 0;
    this.resgate.quantidadeParcelaResgate = 1;
  }

}
