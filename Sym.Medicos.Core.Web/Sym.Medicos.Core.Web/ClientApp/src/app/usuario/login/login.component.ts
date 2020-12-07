import { Component } from "@angular/core";
import { Usuario } from "../../model/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioServico } from "../../services/usuario/usuario.servico";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent {
  public usuario;
  public returnUrl: string;
  public mensagem: string;
  private ativar_spinner: boolean;

  /* Construtor */
  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private usuarioServico: UsuarioServico) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  entrar(): void {
    this.ativar_spinner = true;
    this.usuarioServico.verificaUsuario(this.usuario)
      .subscribe(
        cliente_json => {
          this.usuarioServico.usuario = cliente_json;

          if (this.returnUrl == null) {
            this.ativar_spinner = false;
            this.router.navigate(['/']);
          } else {
            this.ativar_spinner = false;
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          console.log(err.error);
          this.mensagem = err.error;
          this.ativar_spinner = false;
        }
      );          
  }
}
