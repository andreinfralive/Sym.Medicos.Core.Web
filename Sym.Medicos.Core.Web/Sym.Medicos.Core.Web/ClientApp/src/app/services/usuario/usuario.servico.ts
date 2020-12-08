import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../../model/usuario";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class UsuarioServico implements OnInit{
  private baseURL: string;
  private _usuarios: Usuario;

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this._usuarios = usuario;
  }

  /* Construtor */
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
  }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  /* Cadastra o Usuario */
  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL + "api/usuario", JSON.stringify(usuario),
      { headers: this.headers });
  }

  /* Deletar Usuario */
  public deletar(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.baseURL + "api/usuario/deletar", JSON.stringify(usuario),
      { headers: this.headers });
  }

  /* Obter todos os Usuarios */
  public obterTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL + "api/usuario");
  }

  /* Obter Medico por Id */
  public obterUsuarioPorId(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseURL + "api/usuario/obterUsuarioPorId");
  }

  get usuario(): Usuario {
    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuarios = JSON.parse(usuario_json);
    return this._usuarios;
  }

  /* Verificar se o Usuário está autenticado */
  public usuario_autenticado(): boolean {
    return this._usuarios != null && this._usuarios.email != "" && this._usuarios.senha != "";
  }

  /* Verifica se o Usuario é Administrador */
  public usuario_administrador(): boolean {
    return this.usuario_autenticado() && this.usuario.ehAdministrador;
  }

  /* Limpa a sessao */
  public limpar_sessao() {
    sessionStorage.setItem("usuario-autenticado", "");
    this._usuarios = null;
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
}

