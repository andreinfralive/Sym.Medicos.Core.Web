import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MedicoComponent } from './medico/medico.component';
import { ConsultorioComponent } from './consultorio/consultorio.component';
import { VinculoComponent } from './vinculo/vinculo.component';
import { LoginComponent } from '../app/usuario/login/login.component';
import { GuardaRotas } from './autorizacao/guarda.rotas';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from '../app/usuario/cadastro/cadastro.usuario.component';
import { UsuarioServico } from './services/usuario/usuario.servico';
import { MedicoServico } from './services/medico/medico.servico';
import { ConsultorioServico } from './services/consutorio/consultorio.servico';
import { PesquisaConsultorioComponent } from './consultorio/pesquisa/pesquisa.consultorio.component';
import { PesquisaMedicoComponent } from './medico/pesquisa/pesquisa.medico.component';
import { PesquisaUsuarioComponent } from './usuario/pesquisa/pesquisa.usuario.component';
import { PesquisaVinculoComponent } from "./vinculo/pesquisa/pesquisa.vinculo.component";
  
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MedicoComponent,
    VinculoComponent,
    ConsultorioComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    PesquisaConsultorioComponent,
    PesquisaMedicoComponent,
    PesquisaUsuarioComponent,
    PesquisaVinculoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Medico', component: MedicoComponent, canActivate: [GuardaRotas] },
      { path: 'Vinculo', component: VinculoComponent, canActivate: [GuardaRotas] },
      { path: 'Consultorio', component: ConsultorioComponent, canActivate: [GuardaRotas] },
      { path: 'Entrar', component: LoginComponent },
      { path: 'novo-usuario', component: CadastroUsuarioComponent },
      { path: 'pesquisa-consultorio', component: PesquisaConsultorioComponent, canActivate: [GuardaRotas] },
      { path: 'pesquisa-medico', component: PesquisaMedicoComponent, canActivate: [GuardaRotas] },
      { path: 'pesquisa-usuario', component: PesquisaUsuarioComponent, canActivate: [GuardaRotas] },
      { path: 'pesquisa-vinculo', component: PesquisaVinculoComponent, canActivate: [GuardaRotas] },
    ])
  ],
  providers: [UsuarioServico, MedicoServico, ConsultorioServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
