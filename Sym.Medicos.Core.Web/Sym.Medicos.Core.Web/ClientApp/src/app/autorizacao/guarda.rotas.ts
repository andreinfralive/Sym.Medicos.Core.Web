import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsuarioServico } from "../services/usuario/usuario.servico";

@Injectable({
  providedIn: 'root'
})

export class GuardaRotas implements CanActivate {

  /* Construtor */
  constructor(private router: Router, private usuarioServico: UsuarioServico) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /* Se authenticado retornar verdadeiro */
    if (this.usuarioServico.usuario_autenticado()) {
      return true;
    }
    /* Se não authenticado redirecionar pra login */
    this.router.navigate(['/Entrar'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
