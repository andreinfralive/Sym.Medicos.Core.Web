import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { VinculoMedicoConsultorio } from "../../model/vinculoMedicoConsultorio";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class VinculoServico implements OnInit {
  private baseURL: string;
  public vinculos: VinculoMedicoConsultorio[];

  /* Construtor */
  constructor(private http: HttpClient) {
    this.baseURL = environment.baseURL;
  }

  ngOnInit(): void {
    this.vinculos = [];
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  /* Cadastra o Vinculo Consultório e Médico */
  public cadastrarVinculo(vinculo: VinculoMedicoConsultorio): Observable<VinculoMedicoConsultorio> {
    return this.http.post<VinculoMedicoConsultorio>(this.baseURL + "api/VinculoConsultorioMedico", JSON.stringify(vinculo),
      { headers: this.headers });
  }

  /* Salvar o vinculo Consultório e Médico já cadastrados */
  public editarVinculo(vinculo: VinculoMedicoConsultorio): Observable<VinculoMedicoConsultorio> {
    return this.http.post<VinculoMedicoConsultorio>(this.baseURL + "api/VinculoConsultorioMedico/alterar", JSON.stringify(vinculo),
      { headers: this.headers });
  }

  /* Deletar Vinculo Consultório e Médico */
  public deletar(vinculo: VinculoMedicoConsultorio): Observable<VinculoMedicoConsultorio[]> {
    return this.http.post<VinculoMedicoConsultorio[]>(this.baseURL + "api/VinculoConsultorioMedico/deletar", JSON.stringify(vinculo),
      { headers: this.headers });
  }

  /* Obter todos os Medicos e Vínculos com Consultorio */
  public obterTodosVinculos(): Observable<VinculoMedicoConsultorio[]> {
    return this.http.get<VinculoMedicoConsultorio[]>(this.baseURL + "api/VinculoConsultorioMedico");
  }

  /* Obter Vinculo Consultório e Médicos por CRM */
  public obterViculoPorCRM(crm: string): Observable<VinculoMedicoConsultorio> {
    return this.http.get<VinculoMedicoConsultorio>(this.baseURL + "api/VinculoConsultorioMedico/obterViculoPorCRM");
  }
}
