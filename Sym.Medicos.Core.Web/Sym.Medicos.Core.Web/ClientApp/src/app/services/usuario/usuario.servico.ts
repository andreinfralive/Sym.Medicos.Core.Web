import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../../model/usuario";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class UsuarioServico {

  private baseURL: string;
  private _usuario: Usuario;

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get usuario(): Usuario {
    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuario = JSON.parse(usuario_json);
    return this._usuario;
  }

  /* Verificar se o Usuário está autenticado */
  public usuario_autenticado(): boolean {
    return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";
  }

  /* Verifica se o Usuario é Administrador */
  public usuario_administrador(): boolean {
    return this.usuario_autenticado() && this.usuario.ehAdministrador;
  }

  /* Limpa a sessao */
  public limpar_sessao() {
    sessionStorage.setItem("usuario-autenticado", "");
    this._usuario = null;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  /* Construtor */
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
  }

  /* Verifica o usuario e retorna se está valido */
  public verificaUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      email: usuario.email,
      senha: usuario.senha
    }
    return this.http.post<Usuario>(this.baseURL + "api/usuario/verificaUsuario", body, { headers });
  }

  /* Cadastra o Usuario */
  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL + "api/usuario", JSON.stringify(usuario),
      { headers: this.headers });
  }
}

