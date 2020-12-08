import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Consultorio } from "../../model/consultorio";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class ConsultorioServico implements OnInit {
  private baseURL: string;
  public consultorios: Consultorio[];

  /* Construtor */
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
  }

  ngOnInit(): void {
    this.consultorios = [];
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  /* Cadastra o Consultorio */
  public cadastrarConsultorio(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(this.baseURL + "api/consultorio", JSON.stringify(consultorio),
      { headers: this.headers });
  }

  /* Deletar Consultorio */
  public deletar(consultorio: Consultorio): Observable<Consultorio[]> {
    return this.http.post<Consultorio[]>(this.baseURL + "api/consultorio/deletar", JSON.stringify(consultorio),
      { headers: this.headers });
  }

  /* Obter todos os Consultorios */
  public obterTodosConsultorios(): Observable<Consultorio[]> {
    return this.http.get<Consultorio[]>(this.baseURL + "api/consultorio");
  }

  /* Obter Consultorio por Id */
  public obterConsultorioPorId(idConsultorio: number): Observable<Consultorio> {
    return this.http.get<Consultorio>(this.baseURL + "api/consultorio/ObterConsultorioPorId");
  }
}
