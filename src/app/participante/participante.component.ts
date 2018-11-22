import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaDTO, ParticipanteDTO } from '../model/participante.dto';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { ParticipanteService } from '../services/participante.service';

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

  empresas: EmpresaDTO[];
  empresa: EmpresaDTO;
  
  participante: ParticipanteDTO = {
    id: 0,
    name : "",
    sobrenome: "",
    dataNascimento: null,
    cpf: null,
    endereco: "",
    cidade: "",
    cep: null,
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
    renda: null
  }

  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public empresaService: EmpresaService,
    public http: HttpClient,
    private participanteService: ParticipanteService
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
      endereco:  ['', Validators.required],
      dataNascimento: [''],
      cpf: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: [''],
      estado: [''],
      pais: [''],
      empresa: ['', Validators.required],
      dataAposentadoria: ['', Validators.required],
      valorPortabilidade: [''],
      planoPortabilidade: [''],
      situacaoParticipante: ['', Validators.required],
      valorParcelaContribuicao:  ['', Validators.required],
      sexo: ['', Validators.required],
      estadoCivil: [''],
      telefone: [''],
      renda: ['']
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
    return;
    }
    this.participanteService.salva(this.participante)
    .subscribe(() => {
      console.log('Salvo com sucesso!');
    }, error => {
      console.log(error);
    });

  }

}
