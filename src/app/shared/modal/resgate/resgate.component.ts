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

  saldoDisponivelRetirada: number;

  resgate: ResgateDTO = {
    id: 0,
    tipoResgate: "",
    tipoSaldoResgate: "",
    dataResgate: null,
    valorParcelaResgate: null,
    idParticipanteFk: 0,
    opcaoPagamentoParcelado: "",
    quantidadeParcelaResgate: 1,
    dataLiberacaoResgate: "",
    formulario: null,
    valorResgateParcial: null
  };

  formularioUpload: File = null;
  
  constructor(
    private resgateService: ResgateService,
    private saldoService: SaldoService,
    private participanteService: ParticipanteService,
    private toastrService: ToastrService,
    private dateService: DateService,
    ) { }

  ngOnInit() {
    this.limpaFormulario();
  }

  calculaValorParcela() {

    if (this.resgate.opcaoPagamentoParcelado == "0") {
      if (this.resgate.tipoResgate == "0") {
        this.resgate.valorParcelaResgate = Number((this.resgate.valorResgateParcial / this.resgate.quantidadeParcelaResgate).toFixed(2));
        return;
      } 
      if (this.resgate.tipoResgate == "1") {
        this.resgate.valorParcelaResgate = Number((this.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate).toFixed(2));
        return;
      } 
    }

  }

  uploadFormulario(arquivos: FileList) {
    this.formularioUpload = arquivos.item(0);
    this.resgate.formulario = new Blob([this.formularioUpload],{type: 'application/pdf'});
  }

  atualizaSaldoDisponivelRetirada() {
    switch (this.resgate.tipoSaldoResgate) {
      case "0": // resgatePortabilidade
        this.saldoDisponivelRetirada = this.participante.saldoPortabilidade;
        break;
      case "1": // resgateContribuicaoNormal
        this.saldoDisponivelRetirada = Number((this.saldo.saldoContribuicoesNormais * (20/100)).toFixed(2)); // 20% ao ano
        break;
      case "2": // resgateContribuicaoAdicional
        this.saldoDisponivelRetirada = Number(this.saldo.saldoContribuicoesAdicionais);
        break;
      case "3": // resgateTotal
        this.saldoDisponivelRetirada = this.saldo.saldoTotal;
        break;
    }
  }

  resgatePortabilidade() {
    if (this.participante.planoPortabilidade == "2") {
      this.toastrService.error("O resgate não se enquadra nesse tipo de plano de portabilidade.");
      return;
    }

    if (this.resgate.tipoResgate == "0") { // resgate parcial portabilidade 
      
      if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado parcial portabilidade
        if (this.resgate.valorResgateParcial >= this.saldoDisponivelRetirada) {
          this.toastrService.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
          return;
        }    
      } else { // resgate não parcelado parcial portabilidade
        this.resgate.valorParcelaResgate = this.resgate.valorResgateParcial;
      }

      this.participante.saldoPortabilidade -= this.resgate.valorResgateParcial;
      this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
      this.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;
      return;
    }

    // resgate total portabilidade
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total portabilidade
      this.resgate.valorParcelaResgate = Number((this.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate).toFixed(2));
    } else { // resgate não parcelado total portabilidade
      this.resgate.valorParcelaResgate = this.saldoDisponivelRetirada;
    }

    this.participante.saldoPortabilidade -= this.saldoDisponivelRetirada;
    this.saldo.saldoTotal -= this.saldoDisponivelRetirada;
    this.saldoDisponivelRetirada = 0;

  }

  resgateContribuicaoNormal() {

    if (this.resgate.tipoResgate == "0") { // resgate parcial contribuicao normal 

      
      if (this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado parcial contribuicao normal 
        if (this.resgate.valorResgateParcial < this.saldoDisponivelRetirada) {
          this.resgate.valorParcelaResgate = Number(( this.resgate.valorResgateParcial / this.resgate.quantidadeParcelaResgate).toFixed(2));
          this.participante.dataProximoResgateNormal = (this.dateService.adicionaAnos(new Date(), 2));
          this.saldo.saldoContribuicoesNormais -= this.resgate.valorResgateParcial;
          this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
          this.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;
          return;
        } else {    
          this.toastrService.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
          return;
        }
      }
     
      // resgate não parcelado parcial contribuicao normal 
      this.participante.dataProximoResgateNormal = (this.dateService.adicionaAnos(new Date(), 2));
      this.saldo.saldoContribuicoesNormais -= this.resgate.valorResgateParcial;
      this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
      this.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;

    }

    if (this.resgate.tipoResgate == "1") { // resgate total (20%) contribuicao normal

      if (this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total contribuicao normal 
        this.resgate.valorParcelaResgate = Number((this.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate).toFixed(2));
        this.participante.dataProximoResgateNormal = this.dateService.adicionaAnos(new Date(), 2)
        this.saldo.saldoContribuicoesNormais -= this.saldoDisponivelRetirada;
        this.saldo.saldoTotal -= this.saldoDisponivelRetirada;
        this.saldoDisponivelRetirada = 0;
        return;
      } 

      // resgate total (20%)  contribuicao normal 
      this.participante.dataProximoResgateNormal = this.dateService.adicionaAnos(new Date(), 2)
      this.saldo.saldoContribuicoesNormais -= this.saldoDisponivelRetirada;
      this.saldo.saldoTotal -= this.saldoDisponivelRetirada;
      this.saldoDisponivelRetirada = 0;
      return;
    }
  }

  resgateContribuicaoAdicional() {

    if (this.resgate.tipoResgate == "0") { // resgate parcial contribuição adicional
       
      if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado parcial contribuição adicional
        if (this.resgate.valorResgateParcial >= this.saldoDisponivelRetirada) {
          this.toastrService.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
          return;
        }    
      } else { // resgate não parcelado parcial contribuição adicional
        this.resgate.valorParcelaResgate = this.resgate.valorResgateParcial;
      }

      this.saldo.saldoContribuicoesAdicionais -= this.resgate.valorResgateParcial;
      this.saldo.saldoTotal -= this.resgate.valorResgateParcial;
      this.saldoDisponivelRetirada -= this.resgate.valorResgateParcial;
      return;
    }

    // resgate total contribuição adicional
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total contribuição adicional
      this.resgate.valorParcelaResgate = Number((this.saldoDisponivelRetirada / this.resgate.quantidadeParcelaResgate).toFixed(2));
    } else { // resgate não parcelado total contribuição adicional
      this.resgate.valorParcelaResgate = this.saldoDisponivelRetirada;
    }

    this.saldo.saldoContribuicoesAdicionais -= this.saldoDisponivelRetirada;
    this.saldo.saldoTotal -= this.saldoDisponivelRetirada;
    this.saldoDisponivelRetirada = 0;
    
  }
  
  resgateTotal() {

    // resgate total todos os saldos
    if(this.resgate.opcaoPagamentoParcelado == "0") { // resgate parcelado total todos os saldos
      if (this.resgate.valorResgateParcial != this.saldoDisponivelRetirada) {
        this.toastrService.error("O saldo do resgate parcial não pode ser igual ao valor total disponível.");
        return;
      } else { // resgate não parcelado total todos os saldos
      this.resgate.valorParcelaResgate = this.saldoDisponivelRetirada;
      }
    }

    this.saldo.saldoContribuicoesAdicionais = 0;
    this.saldo.saldoContribuicoesNormais = 0;
    this.participante.saldoPortabilidade = 0;
    this.saldo.saldoTotal -= this.saldoDisponivelRetirada;
    this.saldoDisponivelRetirada = 0;
    this.participante.situacaoParticipante = "1";

    this.toastrService.success("O valor foi resgatado com sucesso e seu plano foi cancelado.");
  }

  validaResgate() {

    if (this.resgate.tipoSaldoResgate == "1") {
      if (this.participante.dataProximoResgateNormal != null && this.participante.dataProximoResgateNormal != undefined &&
        this.dateService.isDataMaiorQueHoje(new Date(this.participante.dataProximoResgateNormal))) {
        this.toastrService.error("O resgate não pode ser realizado dentro do período de 2 anos, após o ultimo resgate. Você poderá realizar um novo resgate a partir de: " 
         + this.dateService.formataData(new Date(this.participante.dataProximoResgateNormal)));
        return;
      }
    }

    if (this.resgate.tipoResgate == "0" && this.resgate.tipoSaldoResgate == "3") {
      this.toastrService.warning("Não é possível realizar saque parcial do resgate total.")
      return;
    }

    if (this.resgate.tipoResgate == "" || this.resgate.tipoSaldoResgate == "") {
      this.toastrService.warning("Você deve selecionar o tipo de resgate e o tipo de saldo de resgate.");
      return false; 
    }
   
    if (this.participante.situacaoParticipante == "1" || this.participante.situacaoParticipante == "2") {
      this.toastrService.error("O resgate não pode ser realizado por um participante com situação atual de Cancelado ou Benefício.");
      return false; 
    }
    
    if (this.dateService.isDataMaiorQueHoje(new Date(this.participante.carencia))) {
      this.toastrService.info("O prazo de carência ainda não foi cumprido. O resgate poderá ser solicitado a partir de " + this.dateService.formataData(new Date(this.participante.carencia)));
      return false; 
    }

    if (this.saldoDisponivelRetirada <= 0) {
      this.toastrService.info("Você não possui saldo disponível para resgate.");
      return false;
    }

    if (this.resgate.tipoResgate == "0") {
      if (this.resgate.formulario == null) {
        this.toastrService.error("Para realizar o resgate parcial é necessário encaminhar o formulário preenchido");
        return false;
      }

      if (this.resgate.valorResgateParcial > this.saldoDisponivelRetirada)  {
        this.toastrService.warning("Valor parcial maior que valor disponivel para retirada.");
        return false;
      }
    }

    if(this.resgate.opcaoPagamentoParcelado == "0" && this.resgate.quantidadeParcelaResgate <= 0) {
      this.toastrService.error("Quantidade de parcelas inválida para resgate.");
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
    this.resgate.dataResgate = new Date();
    this.resgate.dataLiberacaoResgate =  (this.dateService.adicionaDias(new Date(), 30));

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
      this.toastrService.success("O resgate foi realizado com sucesso.");
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
    this.resgate.quantidadeParcelaResgate = 0;
    this.saldoDisponivelRetirada = 0;
  }

}
