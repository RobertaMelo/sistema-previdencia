import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';

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

  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public empresaService: EmpresaService
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
      valorParcelaContribuicao:  ['', Validators.required]
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
    .subscribe((response) => {
    console.log(response);
    }, error => {
      console.log(error);
    });
  }


}
