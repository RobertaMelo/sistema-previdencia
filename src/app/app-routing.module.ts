import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParticipanteComponent } from './participante/participante.component';
import { SaldosComponent } from './saldos/saldos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'participante',
    component: ParticipanteComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },    
  {
    path: 'saldos',
    component: SaldosComponent
  }, 
  { 
  path: '**', 
  redirectTo: ''
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
