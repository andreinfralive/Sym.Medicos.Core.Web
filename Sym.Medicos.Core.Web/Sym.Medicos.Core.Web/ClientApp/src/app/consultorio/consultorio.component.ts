import { Component, OnInit } from "@angular/core"
import { Consultorio } from "../model/consultorio";
import { ConsultorioServico } from "../services/consutorio/consultorio.servico";
import { Router } from "@angular/router";

@Component({
  selector: "consultorio",
  templateUrl: "./consultorio.component.html",
  styleUrls: ["./consultorio.component.css"]
})

export class ConsultorioComponent implements OnInit{
  public consultorio: Consultorio
  public ativar_spinner: boolean;
  public mensagem: string;
  public consultorioCadastrado: boolean;

  constructor(private consultorioServico: ConsultorioServico, private router: Router) {

  }

  ngOnInit(): void {
    var consultorioSession = sessionStorage.getItem('consultorioSession');
    if (consultorioSession) {
      this.consultorio = JSON.parse(consultorioSession)
    }
    else {
      this.consultorio = new Consultorio();
    }
  }

  public cadastrar() {
    this.ativarEspera();
    this.consultorioServico.cadastrarConsultorio(this.consultorio)
      .subscribe(
        consultorioJson => {
          this.consultorioCadastrado = true;
          this.mensagem = "";
          this.desativarEspera();
          this.router.navigate(['/pesquisa-consultorio'])
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
