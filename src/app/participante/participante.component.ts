import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaDTO, ParticipanteDTO } from '../model/participante.dto';
import { HttpClient } from '@angular/common/http';
import { ParticipanteService } from '../services/participante.service';
import { SaldoService } from '../services/saldo.service';
import { SaldoDTO } from '../model/saldo.dto';
import { DateService } from '../services/date.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {

  form : FormGroup;
  
  isShowMessage : boolean;
  message: string;
  messageType: string;

  empresasId: number[];
  empresas: EmpresaDTO[];
  
  saldo: SaldoDTO = {
    id: 0,
    saldoContribuicoesNormais: 0,
    saldoContribuicoesAdicionais: 0,
    quantidadeParcelas: 0,
    saldoTotal: 0,
  };

  participante: ParticipanteDTO = {
    id: 0,
    nome : "",
    sobrenome: "",
    dataNascimento: null,
    cpf: null,
    endereco: "",
    cidade: "",
    estado: "",
    pais: "",
    dataAposentadoria: null,
    saldoPortabilidade: null,
    planoPortabilidade: "",
    situacaoParticipante: "",
    valorParcelaContribuicao: null,
    dataCadastro: null,
    carencia: null,
    idEmpresaFK: null,
    idSaldoFK: null,
    sexo: "",
    estadoCivil: "",
    telefone: null,
    renda: null,
    dataProximoResgateNormal: null
  }

  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public empresaService: EmpresaService,
    public http: HttpClient,
    private saldoService: SaldoService,
    private participanteService: ParticipanteService,
    private dateService: DateService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.formSubmitAttempt = false;
    this.iniciaForm();
    this.carregaEmpresas();
  }

  iniciaForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      endereco:  [''], 
      dataNascimento: [''],
      cpf: ['', Validators.required],
      cidade: [''], 
      estado: [''],
      pais: [''],
      idEmpresaFK: ['', Validators.required],
      dataAposentadoria: ['', Validators.required],
      saldoPortabilidade: [''],
      planoPortabilidade: [''],
      situacaoParticipante: ['', Validators.required],
      valorParcelaContribuicao:  ['', Validators.required],
      sexo: ['', Validators.required],
      estadoCivil: [''],
      telefone: [''],
      renda: [''],
      idSaldoFK: [''],
      carencia: [''],
      dataProximoResgateNormal:['']
    })
  }

  showMessage(mensagem, messageType) {
    this.isShowMessage = true;
    this.message = mensagem;
    this.messageType = messageType;
    setTimeout(() => {this.hideMessage();}, 4000);
  }

  hideMessage() {
    this.isShowMessage = false;
    this.message = '';
    this.messageType = '';
  }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  carregaEmpresas() {
    this.empresaService.buscaEmpresas()
    .subscribe(response => {
      this.empresas = response;
    }, error => {
      console.log(error);
    });
  }

  salvaParticipante() {
    this.formSubmitAttempt = true;
    if (!this.form.valid) {
      this.toastrService.warning("Houve algum problema na gravação do registro.");
      console.log("Formulário inválido");
      return;
    }

    this.saldoService.salva(this.saldo)
    .subscribe(response => {
      this.form.get('idSaldoFK').setValue(response['id']);
      this.form.get('carencia').setValue(this.dateService.adicionaMeses(new Date(), 36));
      this.participanteService.salva(this.form.value)
      .subscribe(response => {
        this.toastrService.success("Salvo com sucesso.");
        console.log('Salvo com sucesso! ' + response);
        this.reset()
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });

  }

}
