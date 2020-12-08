import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioServico } from "../../services/usuario/usuario.servico";

@Component({
  selector: "pesquisa-usuario",
  templateUrl: "./pesquisa.usuario.component.html",
  styleUrls: ["./pesquisa.usuario.component.css"]
})

export class PesquisaUsuarioComponent implements OnInit {

  public usuarios: Usuario[];

  ngOnInit(): void {

  }

  constructor(private usuarioServico: UsuarioServico, private router: Router) {
    this.usuarioServico.obterTodosUsuarios()
      .subscribe(
        usuario => {
          this.usuarios = usuario
        },
        e => {
          console.log(e.error);
        });
  }

  public adicionarUsuario() {
    sessionStorage.setItem('usuarioSession', '');
    this.router.navigate(['/novo-usuario']);
  }

  public deletarUsuario(usuario: Usuario) {
    var retorno = confirm("Deseja realmente deletar o Usuário selecionado?");

    if (retorno == true)
      this.usuarioServico.deletar(usuario)
        .subscribe(
          usuario => {
            this.usuarios = usuario;
          },
          e => {
            console.log(e.error);
          });
  }

  public editarUsuario(usuario: Usuario) {
    sessionStorage.setItem('usuarioSession', JSON.stringify(usuario));
    this.router.navigate(['/novo-usuario']);
  }

}
