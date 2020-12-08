import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { VinculoMedicoConsultorio } from "../../model/vinculoMedicoConsultorio";
import { environment } from "../../../../src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class HomeServico implements OnInit {
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

  /* Obter todos os Medicos e Vínculos com Consultorio */
  public obterTodosVinculos(): Observable<VinculoMedicoConsultorio[]> {
    return this.http.get<VinculoMedicoConsultorio[]>(this.baseURL + "api/VinculoConsultorioMedico");
  }
}
