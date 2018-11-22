import { Component, OnInit } from '@angular/core';
import { ParticipanteDTO } from '../model/participante.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  participante: ParticipanteDTO;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  selecionaParticipante(participanteSelecionado) {
    this.participante = participanteSelecionado;
  }

  irParaSaldo() {
    this.router.navigate(['/saldos', {participanteId: this.participante.id}]);
  }

}
