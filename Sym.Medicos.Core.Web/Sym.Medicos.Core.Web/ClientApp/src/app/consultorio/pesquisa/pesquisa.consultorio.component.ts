import { Component, OnInit } from "@angular/core";
import { Consultorio } from "../../model/consultorio";
import { Router, ActivatedRoute } from "@angular/router";
import { ConsultorioServico } from "../../services/consutorio/consultorio.servico";

@Component({
  selector: "pesquisa-consultorio",
  templateUrl: "./pesquisa.consultorio.component.html",
  styleUrls: ["./pesquisa.consultorio.component.css"]
})

export class PesquisaConsultorioComponent implements OnInit{

  public consultorios: Consultorio[];

  ngOnInit(): void {

  }

  constructor(private consultorioServico: ConsultorioServico, private router: Router) {
    this.consultorioServico.obterTodosConsultorios()
      .subscribe(
        consultorio => {
          this.consultorios = consultorio
        },
        e => {
          console.log(e.error);
        });
  }

  public adicionarConsultorio() {
    sessionStorage.setItem('consultorioSession', '');
    this.router.navigate(['/Consultorio']);
  }

  public deletarConsultorio(consultorio: Consultorio) {
    var retorno = confirm("Deseja realmente deletar o consultório selecionado?");

    if (retorno == true)
      this.consultorioServico.deletar(consultorio)
        .subscribe(
          consultorio => {
            this.consultorios = consultorio;
          },
          e => {
            console.log(e.error);
          });
  }

  public editarConsultorio(consultorio: Consultorio) {
    sessionStorage.setItem('consultorioSession', JSON.stringify(consultorio));
    this.router.navigate(['/Consultorio']);
  }

}
