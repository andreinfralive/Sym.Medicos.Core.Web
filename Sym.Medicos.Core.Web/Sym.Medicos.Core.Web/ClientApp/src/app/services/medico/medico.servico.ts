import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Medico } from "../../model/medico";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class MedicoServico implements OnInit {
  private baseURL: string;
  public medicos: Medico[];

  /* Construtor */
  constructor(private http: HttpClient) { 
    this.baseURL = environment.baseURL;
  }

  ngOnInit(): void {
    this.medicos = [];
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  /* Cadastra o Medico */
  public cadastrarMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.baseURL + "api/medico", JSON.stringify(medico),
      { headers: this.headers });
  }

  /* Deletar Medico */
  public deletar(medico: Medico): Observable<Medico[]> {
    return this.http.post<Medico[]>(this.baseURL + "api/medico/deletar", JSON.stringify(medico),
      { headers: this.headers });
  }

  /* Obter todos os Medicos */
  public obterTodosMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.baseURL + "api/medico");
  }

  /* Obter Medico por Id */
  public obterMedicoPorId(idMedico: number): Observable<Medico> {
    return this.http.get<Medico>(this.baseURL + "api/medico/ObterMedicoPorId");
  }
}
