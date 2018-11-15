import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ParticipanteComponent } from './participante/participante.component';
import { SaldosComponent } from './saldos/saldos.component';
import { NgxMaskModule } from 'ngx-mask';
import { NavbarComponent } from './template/navbar/navbar.component';
import { HeadListComponent } from './template/head-list/head-list.component';
import { ProfileComponent } from './template/profile/profile.component';
import { PesquisaParticipanteComponent } from './template/modal/pesquisa-participante/pesquisa-participante.component';
import { ContribuicaoAdicionalComponent } from './template/modal/contribuicao-adicional/contribuicao-adicional.component';
import { ResgateComponent } from './template/modal/resgate/resgate.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParticipanteComponent,
    SaldosComponent,
    NavbarComponent,
    HeadListComponent,
    ProfileComponent,
    PesquisaParticipanteComponent,
    ContribuicaoAdicionalComponent,
    ResgateComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
