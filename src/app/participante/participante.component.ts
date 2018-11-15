import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formSubmitAttempt = false;
  }

  
  iniciaForm() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      number:  ['', Validators.required],
      complement: [''],
      neighbourhood:  ['', Validators.required],
      country: ['', Validators.required],
      state:  ['', Validators.required],
      city: ['', Validators.required]
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


}
