import { Component, OnInit } from '@angular/core';
import { ParticipanteDTO } from '../model/participante.dto';
import { Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';  
import { ParticipanteService } from '../services/participante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  participantes: ParticipanteDTO[];
  participantesFiltrados: ParticipanteDTO[];
  participante: ParticipanteDTO;
  nomeParticipanteFiltro: string;
 
  constructor(
    private router: Router,
    private participanteService: ParticipanteService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.carregaParticipantes();
  }

  carregaParticipantes() {
    this.participanteService.buscaTodos()
    .subscribe(response => {
      this.participantes = response;
    }, error => {
      console.log(error);
    });
  }
  
  selecionaParticipante(participanteSelecionado) {
    this.participante = participanteSelecionado;
    this.nomeParticipanteFiltro = this.participante.nome;
  }

  filtraParticipante() {
    if (this.nomeParticipanteFiltro == undefined || this.nomeParticipanteFiltro == '') {
      this.participantesFiltrados = this.participantes;
      return;
    }
    this.participantesFiltrados = this.participantes.filter(participante => participante.nome.toLowerCase().includes(this.nomeParticipanteFiltro.toLowerCase())); 
  }

  irParaSaldo() {
    if (this.participante == undefined) {
      this.toastrService.warning("Você deve selecionar um participante para realizar a consulta.");
      return;
    }
    this.router.navigate(['/saldos', {participanteId: this.participante.id}]);
  }

}
