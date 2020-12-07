import { Component, OnInit } from "@angular/core";
import { Medico } from "../../model/medico";
import { Router, ActivatedRoute } from "@angular/router";
import { MedicoServico } from "../../services/medico/medico.servico";

@Component({
  selector: "pesquisa-medico",
  templateUrl: "./pesquisa.medico.component.html",
  styleUrls: ["./pesquisa.medico.component.css"]
})

export class PesquisaMedicoComponent implements OnInit {

  public medicos: Medico[];

  ngOnInit(): void {

  }

  constructor(private medicoServico: MedicoServico, private router: Router) {
    this.medicoServico.obterTodosMedicos()
      .subscribe(
        medico => {
          this.medicos = medico
        },
        e => {
          console.log(e.error);
        });
  }

  public adicionarMedico() {
    sessionStorage.setItem('medicoSession', '');
    this.router.navigate(['/Medico']);
  }

  public deletarMedico(medico: Medico) {
    var retorno = confirm("Deseja realmente deletar o médico selecionado?");

    if (retorno == true)
      this.medicoServico.deletar(medico)
        .subscribe(
          medico => {
            this.medicos = medico;
          },
          e => {
            console.log(e.error);
          });
  }

  public editarMedico(medico: Medico) {
    sessionStorage.setItem('medicoSession', JSON.stringify(medico));
    this.router.navigate(['/Medico']);
  }

}
