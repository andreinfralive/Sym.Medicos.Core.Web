import { Component, OnInit } from "@angular/core"
import { VinculoMedicoConsultorio } from "../model/VinculoMedicoConsultorio";
import { VinculoServico } from "../services/vinculo/vinculo.service";
import { Router } from "@angular/router";

@Component({
  selector: "vinculo",
  templateUrl: "./vinculo.component.html",
  styleUrls: ["./vinculo.component.css"]
})

export class VinculoComponent implements OnInit {
  public vinculo: VinculoMedicoConsultorio;
  public ativar_spinner: boolean;
  public mensagem: string;
  public vinculoCadastrado: boolean;

  constructor(private vinculoServico: VinculoServico, private router: Router) {

  }

  ngOnInit(): void {
    var vinculoSession = sessionStorage.getItem('vinculoSession');
    if (vinculoSession) {
      this.vinculo = JSON.parse(vinculoSession)
    }
    else {
      this.vinculo = new VinculoMedicoConsultorio();
    }
  }

  public cadastrar() {
    this.ativarEspera();
    this.vinculoServico.cadastrarVinculo(this.vinculo)
      .subscribe(
        vinculoJson => {
          this.vinculoCadastrado = true;
          this.mensagem = "";
          this.desativarEspera();
          this.router.navigate(['/pesquisa-vinculo'])
        },
        e => {
          this.mensagem = e.error;
          this.desativarEspera();
        })
  }

  public editar() {
    this.ativarEspera();
    this.vinculoServico.editarVinculo(this.vinculo)
      .subscribe(
        vinculoJson => {
          this.mensagem = "";
          this.desativarEspera();
          this.router.navigate(['/pesquisa-vinculo'])
        },
        e => {
          this.mensagem = e.error;
          this.desativarEspera();
        })
  }

  public ativarEspera() {
    this.ativar_spinner = true;
  }

  public desativarEspera() {
    this.ativar_spinner = false;
  }
}
