import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ContribuicaoAdicionalComponent } from "./modal/contribuicao-adicional/contribuicao-adicional.component";
import { PesquisaParticipanteComponent } from "./modal/pesquisa-participante/pesquisa-participante.component";
import { ResgateComponent } from "./modal/resgate/resgate.component";
import { HeadListComponent } from "./head-list/head-list.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component"
import { ContribuicoesService } from "../services/contribuicoes.service";
import { EmpresaService } from "../services/empresa.service";
import { ParticipanteService } from "../services/participante.service";
import { ResgateService } from "../services/resgate.service";
import { SaldoService } from "../services/saldo.service";
import { DateService } from "../services/date.service";
import { DataTableModule } from "angular-6-datatable";

@NgModule ({
    declarations: [
        ContribuicaoAdicionalComponent, 
        PesquisaParticipanteComponent, 
        ResgateComponent, 
        HeadListComponent, 
        NavbarComponent, 
        ProfileComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    exports: [
        ContribuicaoAdicionalComponent, 
        PesquisaParticipanteComponent, 
        ResgateComponent, 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HeadListComponent, 
        NavbarComponent, 
        ProfileComponent
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ContribuicoesService, EmpresaService, ParticipanteService, ResgateService, SaldoService, DateService]
        }
    } 
}