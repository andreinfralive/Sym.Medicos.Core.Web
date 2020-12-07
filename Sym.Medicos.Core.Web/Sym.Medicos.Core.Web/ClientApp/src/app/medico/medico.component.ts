import { Component, OnInit } from "@angular/core"
import { Medico } from "../model/medico";
import { MedicoServico } from "../services/medico/medico.servico";
import { Router } from "@angular/router";

@Component({
  selector: "medico",
  templateUrl: "./medico.component.html",
  styleUrls: ["./medico.component.css"]
})

export class MedicoComponent implements OnInit {
  public medico: Medico
  public ativar_spinner: boolean;
  public mensagem: string;
  public medicoCadastrado: boolean;

  constructor(private medicoServico: MedicoServico, private router: Router) {

  }

  ngOnInit(): void {
    var medicoSession = sessionStorage.getItem('medicoSession');
    if (medicoSession) {
      this.medico = JSON.parse(medicoSession)
    }
    else {
      this.medico = new Medico();
    }
  }

  public cadastrar() {
    this.ativarEspera();
    this.medicoServico.cadastrarMedico(this.medico)
      .subscribe(
        medicoJson => {
          this.medicoCadastrado = true;
          this.mensagem = "";
          this.desativarEspera();
          this.router.navigate(['/pesquisa-medico'])
        },
        e => {
          this.mensagem = e.error;
          this.desativarEspera;
        })
  }

  public ativarEspera() {
    this.ativar_spinner = true;
  }

  public desativarEspera() {
    this.ativar_spinner = false;
  }
}
