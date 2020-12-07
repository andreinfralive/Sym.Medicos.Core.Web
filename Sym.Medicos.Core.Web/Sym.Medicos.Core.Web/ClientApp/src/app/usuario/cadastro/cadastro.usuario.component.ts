import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { UsuarioServico } from "../../services/usuario/usuario.servico";

@Component({
  selector: "cadastro-usuario",
  templateUrl: "./cadastro.usuario.component.html",
  styleUrls: ["./cadastro.usuario.component.css"] 
})

export class CadastroUsuarioComponent implements OnInit {    
  public usuario: Usuario;
  public mensagem: string;
  public usuarioCadastrado: boolean;
  public ativar_spinner: boolean;

  /* Construtor */
  constructor(private usuarioServico: UsuarioServico) {
  }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  /* Cadastrar Usuário */
  public cadastrar() {
    this.ativarEspera();
    this.usuarioServico.cadastrarUsuario(this.usuario)
      .subscribe(
        usuarioJson => {
          this.usuarioCadastrado = true;
          this.mensagem = "";
          this.desativarEspera();
        },
        e => {          
          this.mensagem = e.error;
          this.desativarEspera();
        }
      );
  }
  public ativarEspera() {
    this.ativar_spinner = true;
  }

  public desativarEspera() {
    this.ativar_spinner = false;
  }
}
